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

export const bank = (data: {token: string}) => {
  return request(baseUrl('bankAccount/create'), {
    method: 'post',
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: {
      balance: data.balance,
    },
  });
};

export const useCard = () => {
  return useMutation(card);
};

export const useBankAccount = () => {
  return useMutation(bank);
};

export default card;
