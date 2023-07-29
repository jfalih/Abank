export type ResponseDto<T> = {
  statusCode: number;
  message: string;
  data: T;
};

export default <T = unknown>(
  statusCode: number,
  message: string,
  data: T,
): ResponseDto<T> => ({
  statusCode,
  message,
  data,
});
