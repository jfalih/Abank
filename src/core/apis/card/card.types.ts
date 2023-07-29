import {AxiosError, AxiosResponse} from 'axios';

export type LoginBody = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  expiresIn: string;
};

export type LoginSuccess = AxiosResponse<LoginResponse>;

export type LoginError = AxiosError<{
  statusCode: number;
  message: string;
  error: string;
}>;
