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

export async function copyText(text: string): Promise<string | null> {
  if (!text) return null;

  const isClipboardApiSupported = navigator && "clipboard" in navigator;

  if (isClipboardApiSupported) {
    try {
      await navigator.clipboard.writeText(text);
      return text;
    } catch (error) {
      console.warn("Copy failed", error);
      return null;
    }
  } else {
    // legacy code
    const ta = document.createElement("textarea");
    ta.value = text ?? "";
    ta.style.position = "absolute";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      ta.remove();
      return text;
    } catch (err) {
      console.warn("Legacy Copy failed", err);
      ta.remove();
      return null;
    }
  }
}
