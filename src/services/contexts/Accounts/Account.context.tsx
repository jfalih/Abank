import {createContext, useContext} from 'react';

export interface Accounts {
  data:
    | {
        id: number;
        monthly: number;
        name: string;
        now: number;
        target: number;
      }
    | null
    | undefined;
  setAccounts?(account?: Accounts['data']): void;
}

export const AccountContext = createContext<Accounts>({
  data: null,
});

export const useAccountContext = () => useContext(AccountContext);
