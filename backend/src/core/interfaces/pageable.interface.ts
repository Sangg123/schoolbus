export interface Pageable<T> {
  data: T[];
  meta: PageableMeta;
}

export interface PageableMeta {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
