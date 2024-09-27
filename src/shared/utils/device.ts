export function isMobileOrTablet() {
  // eslint-disable-next-line regexp/no-unused-capturing-group
  return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
};
