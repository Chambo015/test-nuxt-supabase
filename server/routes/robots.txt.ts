export default defineEventHandler(async (event) => {
  event.node.res.setHeader("content-type", "text/plain");

  const config = useRuntimeConfig(event);

  const result = config.public.SiteMode === "production"
    ? `User-Agent: *
Allow: /
Allow: /about
Allow: /methodology
Allow: /methodology/*
Allow: /awareness
Allow: /feed
Allow: /feed/*
Allow: /policy
Allow: /service
Allow: /faq

Disallow: /profile
Disallow: /payments
Disallow: /reset-password
Disallow: /cabinet-infosecurity
Disallow: /my-courses

Sitemap: ${config.public.BaseSiteUrl}/sitemap.xml`
    : `User-agent: *
Disallow: /`;

  return result;
});
