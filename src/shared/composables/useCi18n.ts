export const useCi18n = (key: string, options: Record<string | number, string> = {}) => {
  const { $i18n } = useNuxtApp();
  return $i18n.t(key, options);
};
