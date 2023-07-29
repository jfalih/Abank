import React, {useState} from 'react';
import {AccountContext, Accounts} from './Account.context';
import pockets from '../../../data/pocket.json';

export interface ScrollProviderProps {
  children?: React.ReactNode;
}

export const AccountProvider: React.FC<ScrollProviderProps> = props => {
  const {children} = props;
  const [accounts, setAccounts] = useState<Accounts['data']>(pockets);
  return (
    <AccountContext.Provider
      value={{
        data: accounts,
        setAccounts,
      }}>
      {children}
    </AccountContext.Provider>
  );
};
