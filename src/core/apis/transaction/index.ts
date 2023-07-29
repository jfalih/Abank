import request from '../../http/request';
import {baseUrl} from '../../http/url';
import {useMutation} from 'react-query';

export const transaction = (data: {
  token: string;
  accountNo: number;
  traxType: string[];
  pageNumber: number;
  recordsPerPage: number;
}) => {
  return request(baseUrl('bankAccount/transaction/info'), {
    method: 'post',
    headers: {
      Authorization: `Bearer ${data?.token}`,
    },
    data: {
      accountNo: data.accountNo,
      traxType: data.traxType,
      pageNumber: data.pageNumber,
      recordsPrerPage: data.recordsPerPage,
    },
  });
};

export const transactionAll = (data: {token: string}) => {
  return request(baseUrl('bankAccount/info/all'), {
    method: 'post',
    headers: {
      Authorization: `Bearer ${data?.token}`,
    },
  });
};

export const useTransaction = () => {
  return useMutation(transaction);
};

export const useTransactionAll = () => {
  return useMutation(transactionAll);
};

export default transaction;
