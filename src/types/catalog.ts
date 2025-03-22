export interface ProductFilters {
  search?: string;
  categories?: string[];
  industries?: string[];
  brands?: string[];
  page: number;
  itemsPerPage: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
}