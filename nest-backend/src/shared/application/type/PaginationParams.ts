export interface PaginationParams {
    page: number;
    limit: number;
}

export interface Page<T> {
    items: T[];
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
}