export default defineEventHandler(async (event) => {
  event.node.res.setHeader("content-type", "text/xml");

  const config = useRuntimeConfig(event);
  if (config.public.SiteMode !== "production") return "";

  const dateNow = new Date();
  const methodology = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let totalFeeds: { id: number }[] = [];

  const fetchFeeds = async (url = `${config.public.BaseAPIUrl}content/content`) => {
    const res = await $fetch<{ data: { id: number }[], links: { next: string | null } }>(url);
    totalFeeds = [...totalFeeds, ...res.data];
    if (res.links.next) {
      await fetchFeeds(res.links.next);
    }
  };

  await fetchFeeds();

  let result = "";
  result += "<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>";

  result += `
  <url>
    <loc>https://citizensec.kz/</loc>
    <lastmod>${dateNow.toISOString()}</lastmod>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>https://citizensec.kz/feed</loc>
    <lastmod>${dateNow.toISOString()}</lastmod>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>https://citizensec.kz/awareness</loc>
    <lastmod>${dateNow.toISOString()}</lastmod>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>https://citizensec.kz/methodology</loc>
    <lastmod>${dateNow.toISOString()}</lastmod>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>https://citizensec.kz/about</loc>
    <lastmod>${dateNow.toISOString()}</lastmod>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>https://citizensec.kz/policy</loc>
    <lastmod>${dateNow.toISOString()}</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://citizensec.kz/faq</loc>
    <lastmod>${dateNow.toISOString()}</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://citizensec.kz/courses</loc>
    <lastmod>${dateNow.toISOString()}</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://citizensec.kz/service</loc>
    <lastmod>${dateNow.toISOString()}</lastmod>
    <priority>0.80</priority>
  </url>`;

  for (let i = 0; i < methodology.length; i++) {
    result += `
    <url>
      <loc>https://citizensec.kz/methodology/${methodology[i]}</loc>
      <lastmod>${dateNow.toISOString()}</lastmod>
      <priority>0.80</priority>
    </url>`;
  }

  for (let i = 0; i < totalFeeds.length; i++) {
    result += `
    <url>
      <loc>https://citizensec.kz/feed/${totalFeeds[i].id}</loc>
      <lastmod>${dateNow.toISOString()}</lastmod>
      <priority>0.80</priority>
    </url>`;
  }

  result += "</urlset>";

  return result;
});
