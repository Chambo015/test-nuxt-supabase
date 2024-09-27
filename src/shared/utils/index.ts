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

export default function objectToGetParams(object: {
  [key: string]: string | number | undefined | null
}) {
  const params = Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);

  return params.length > 0 ? `?${params.join("&")}` : "";
};
