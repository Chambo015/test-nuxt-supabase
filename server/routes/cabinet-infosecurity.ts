export default defineEventHandler(async (event) => {
  await sendRedirect(event, "/cabinet-infosecurity/progress", 302);
});
