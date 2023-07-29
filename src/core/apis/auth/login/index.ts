import {z} from 'zod';
import request from '../../../http/request';
import {LoginBody, LoginError, LoginSuccess} from './login.types';
import {useMutation} from 'react-query';
import {baseUrl} from '../../../http/url';

export const login = (data: LoginBody) => {
  return request(baseUrl('user/auth/token'), {
    method: 'post',
    data,
  });
};

export const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(5),
});

export const useLogin = () => {
  return useMutation<LoginSuccess, LoginError, LoginBody, unknown>(login);
};

export default login;
