import kk_pages from "./kk/pages.json";
import kk_validation from "./kk/validation.json";
import kk_message from "./kk/message.json";
import kk_actions from "./kk/actions.json";

import ru_pages from "./ru/pages.json";
import ru_validation from "./ru/validation.json";
import ru_message from "./ru/message.json";
import ru_actions from "./ru/actions.json";

import en_pages from "./en/pages.json";
import en_validation from "./en/validation.json";
import en_message from "./en/message.json";
import en_actions from "./en/actions.json";

export const locales = {
  kz: {
    validation: kk_validation,
    message: kk_message,
    pages: kk_pages,
    actions: kk_actions,
  },
  ru: {
    validation: ru_validation,
    message: ru_message,
    pages: ru_pages,
    actions: ru_actions,
  },
  en: {
    validation: en_validation,
    message: en_message,
    pages: en_pages,
    actions: en_actions,
  },
};
