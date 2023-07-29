import {createContext, useContext} from 'react';

export interface Family {
  data:
    | {
        name: string;
        status: 'Owner' | 'Member' | 'Co-Owner';
        now: 20000;
        limit: 1000000;
      }
    | null
    | undefined;
  setFamily?(account?: Family['data']): void;
}

export const FamilyContext = createContext<Family>({
  data: null,
});

export const useFamilyContext = () => useContext(FamilyContext);
