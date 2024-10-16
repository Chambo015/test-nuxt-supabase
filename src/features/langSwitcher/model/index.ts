import { AppLangs } from "~/shared/enums";

export interface TypeLang {
  name: string
  code: AppLangs
}

export const langs: TypeLang[] = [
  { name: "РУ", code: AppLangs.RU },
  { name: "KK", code: AppLangs.KZ },
  { name: "EN", code: AppLangs.EN },
] satisfies TypeLang[];
