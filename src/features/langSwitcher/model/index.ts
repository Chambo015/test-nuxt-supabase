export interface TypeLang {
  name: string
  code: string
}

export const langs: TypeLang[] = [
  { name: "РУ", code: "ru" },
  { name: "KK", code: "kz" },
  { name: "EN", code: "en" },
] satisfies TypeLang[];
