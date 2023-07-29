import request from '../../http/request';
import {baseUrl} from '../../http/url';
import {useMutation} from 'react-query';

export const card = (data: {token: string}) => {
  return request(baseUrl('bankAccount/info/all'), {
    method: 'post',
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};

export const useCard = () => {
  return useMutation(card);
};

export default card;
