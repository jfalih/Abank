export type ErrorResponse<T> = {
  statusCode: number;
  message: string;
  error: T;
};

export type SuccessResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};

export type PaginationResponse<T> = {
  items: T;
  nextPage: number;
  hasNextPage: boolean;
  prevPage: number;
};
