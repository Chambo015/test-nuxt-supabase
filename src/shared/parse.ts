import dayjs from "dayjs";
import {
  isArray,
  isBoolean,
  isNaN,
  isNumber,
  isObject,
  isString,
} from "lodash-es";
import { DatePickerValueFormat } from "~/shared/enums/common.enum";
import type { JsonMapParser, JsonParser } from "~/types";

export abstract class Parse {
  static date(input: unknown) {
    if (input && isString(input)) {
      const dayjsFormat = dayjs(input);
      return dayjsFormat.isValid()
        ? dayjsFormat.format(DatePickerValueFormat.Date)
        : undefined;
    }

    return undefined;
  }

  static baseParseNumber(input: unknown) {
    if (input != null) {
      if (isString(input)) return isNaN(+input) ? null : +input;

      if (isNumber(input)) return input;
    }

    return null;
  }

  static number(input: unknown, { defaultValue = 0 } = {}) {
    return Parse.baseParseNumber(input) ?? defaultValue;
  }

  static boolean(input: unknown, { defaultValue = false } = {}) {
    if (isBoolean(input)) return input;

    if (isNumber(input)) return input > 0;

    if (isString(input)) return input === "true";

    return defaultValue;
  }

  static string(input: unknown, { defaultValue = "" } = {}) {
    if (isString(input)) return input;

    if (input == null) return defaultValue;

    return `${input}`;
  }

  static object<T>(input: unknown, converter: JsonParser<T>) {
    return isObject(input) ? converter(input) : undefined;
  }

  static objectList<T>(input: unknown, converter: JsonParser<T>) {
    if (!isArray<T>(input)) return [];

    return input
      .map(it => (isObject(it) ? converter(it) : null))
      .filter<T>((it): it is T => !!it);
  }

  static list<T, R = T>(input: unknown, converter?: JsonMapParser<T, R>) {
    if (!isArray<T>(input)) return [];

    return converter ? input.map(converter) : input;
  }
}
