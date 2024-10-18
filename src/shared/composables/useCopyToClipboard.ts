import { useMounted } from "./useMounted";

export function useCopyToClipboard() {
  const copiedText = ref<string | null>(null);

  const isMounted = useMounted();
  const isClipboardApiSupported = computed(() => {
    // eslint-disable-next-line no-unused-expressions
    isMounted.value;
    return (navigator && "clipboard" in navigator);
  });

  const copy = async (text: string) => {
    if (!text) return;

    try {
      if (isClipboardApiSupported.value)
        await navigator.clipboard.writeText(text);
      else
        legacyCopy(text);

      copiedText.value = text;
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      copiedText.value = null;
      return false;
    }
  };

  function legacyCopy(value: string) {
    const ta = document.createElement("textarea");
    ta.value = value ?? "";
    ta.style.position = "absolute";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }

  return { copiedText, copy };
}
