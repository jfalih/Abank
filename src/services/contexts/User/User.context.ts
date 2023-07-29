import {createContext, useContext} from 'react';

export interface User {
  data:
    | {
        birthDate: string;
        createTime: number;
        email: string;
        gender: string;
        ktpId: string;
        phoneNumber: string;
        uid: number;
        updateTime: number;
        username: string;
      }
    | null
    | undefined;
  setUser?(user?: User['data']): void;
}

export const UserContext = createContext<User>({
  data: null,
});

export const useUserContext = () => useContext(UserContext);
