export type Nullable<T> = T | null | undefined;
export type Recordable<T = any> = Record<string, T>;
export type JsonParser<T, D = Recordable> = (json: D) => T;
export type JsonMapParser<T, D = Recordable> = (json: D, index: number) => T;
