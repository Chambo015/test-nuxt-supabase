export interface Pagination {
  total?: number
  last_page?: number
  per_page?: number
  current_page: number
}

export function usePagination(options: Pagination) {
  const {
    total = 0, // from server
    last_page = 1, // from server
    per_page = 15,
    current_page = 1, // current page
  } = options;

  return shallowReactive({
    per_page,
    current_page,
    total,
    last_page,
  });
}
