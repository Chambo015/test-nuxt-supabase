export interface ResponseMeta {
  current_page?: number | null // текущая страница
  from?: number | null
  last_page?: number | null
  links?: null
  path?: string | null
  per_page?: number | null // элементов на одной странице
  to?: number | null
  total?: number | null // всего элементов
};

interface ResponseLinks {
  first: string | null
  last: string | null
  next: string | null
  prev: string | null
}

export interface ResponseWithMeta<T> {
  meta?: ResponseMeta
  data: T
  links?: ResponseLinks
};
