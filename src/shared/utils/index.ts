export async function dowlandFile(fileName: string, url?: string) {
  // const blob = await $fetch<any>(url);
  if (!url) return;
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.target = "_blank";
  link.click();
  link.remove();
}

export function isPromise(obj: any): obj is Promise<unknown> {
  return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}

export function objectToGetParamsString(object: {
  [key: string]: string | number | undefined | null
}) {
  const params = Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);

  return params.length > 0 ? `?${params.join("&")}` : "";
};

export async function copyText(text: string) {
  if (!navigator?.clipboard) {
    console.warn("Clipboard not supported");
    return null;
  }

  try {
    await navigator.clipboard.writeText(text);
    return text;
  } catch (error) {
    console.warn("Copy failed", error);
    return null;
  }
}
