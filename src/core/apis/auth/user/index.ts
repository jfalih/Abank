import {useSessionStorage} from '../../../storage';
import request from '../../../http/request';
import {baseUrl} from '../../../http/url';
import {createQueryKeys} from '@lukemorales/query-key-factory';
import {useMutation, useQuery} from 'react-query';

export const user = (data: {token: string}) => {
  return request(baseUrl('user/info'), {
    method: 'post',
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};

export const userKeys = createQueryKeys('user', {
  all: null,
  detail: (token: string) => ({
    queryKey: [token],
    queryFn: () => user(token),
  }),
});

export const useUser = () => {
  return useMutation(user);
};

export default user;
