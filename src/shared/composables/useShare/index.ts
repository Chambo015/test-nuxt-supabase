import assert from "~/shared/utils/assert";
import { isPromise, objectToGetParamsString } from "~/shared/utils";
import { isMobileOrTablet } from "~/shared/utils/device";

// type LinkOptions = Record<string, unknown>;
// type NetworkLink<T> = (url: string, options: T) => string;

interface Options {
  beforeOnClick?: () => void | Promise<void>
  windowWidth?: number
  windowHeight?: number
  onShareWindowClose?: () => void
}

function windowOpen(
  url: string,
  { height, width, ...configRest }: { height: number, width: number, [key: string]: any },
  onClose?: (dialog: Window | null) => void,
) {
  const config: { [key: string]: string | number } = {
    height,
    width,
    location: "no",
    toolbar: "no",
    status: "no",
    directories: "no",
    menubar: "no",
    scrollbars: "yes",
    resizable: "no",
    centerscreen: "yes",
    chrome: "yes",
    ...configRest,
  };

  const shareDialog = window.open(
    url,
    "",
    Object.keys(config)
      .map(key => `${key}=${config[key]}`)
      .join(", "),
  );

  if (onClose) {
    const interval = window.setInterval(() => {
      try {
        if (shareDialog === null || shareDialog.closed) {
          window.clearInterval(interval);
          onClose(shareDialog);
        }
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  return shareDialog;
}

export function useShare(options?: Options) {
  const { beforeOnClick, onShareWindowClose, windowHeight = 400, windowWidth = 550 } = options || {};

  async function handleClick(link: string) {
    if (beforeOnClick) {
      const retVal = beforeOnClick();
      if (isPromise(beforeOnClick)) await retVal;
    }
    windowOpen(link, { width: windowWidth, height: windowHeight }, onShareWindowClose);
  };

  function whatsappShare(url: string, opt?: { title?: string, separator?: string }) {
    assert(url, "whatsapp.url");
    const link = (
      `https://${
      isMobileOrTablet() ? "api" : "web"
      }.whatsapp.com/send${
      objectToGetParamsString({ text: opt?.title ? opt?.title + opt?.separator + url : url })}`
    );
    handleClick(link);
  }

  function telegramShare(url: string, { title }: { title?: string }) {
    assert(url, "telegram.url");
    const link = (
      `https://telegram.me/share/url${
      objectToGetParamsString({ url, text: title })}`
    );
    handleClick(link);
  }

  function twitterShare(
    url: string,
    {
      title,
      via,
      hashtags = [],
      related = [],
    }: { title?: string, via?: string, hashtags?: string[], related?: string[] },
  ) {
    assert(url, "twitter.url");
    assert(Array.isArray(hashtags), "twitter.hashtags is not an array");
    assert(Array.isArray(related), "twitter.related is not an array");

    const link = (
      `https://twitter.com/intent/tweet${
      objectToGetParamsString({
        url,
        text: title,
        via,
        hashtags: hashtags.length > 0 ? hashtags.join(",") : undefined,
        related: related.length > 0 ? related.join(",") : undefined,
      })}`
    );
    handleClick(link);
  }

  return {
    whatsappShare,
    telegramShare,
    twitterShare,
  };
}
