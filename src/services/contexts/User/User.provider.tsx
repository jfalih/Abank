import React, {useState} from 'react';
import {UserContext} from './User.context';
import {User} from './User.context';

export interface UserProviderProps {
  data?: User['data'];
  children?: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = props => {
  const {children} = props;
  const [user, setUser] = useState<User['data']>();

  return (
    <UserContext.Provider
      value={{
        data: user,
        setUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};
