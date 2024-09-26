export interface apiPaginationTypes<T> {
  count: number;
  current_page: number;
  results: T[];
  total_pages: number;
}
