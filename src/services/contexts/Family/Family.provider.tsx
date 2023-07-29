import React, {useState} from 'react';
import fams from '../../../data/family.json';
import {FamilyContext} from '../Family/Family.context';
import {Family} from './Family.context';

export interface ScrollProviderProps {
  children?: React.ReactNode;
}

export const FamilyProvider: React.FC<ScrollProviderProps> = props => {
  const {children} = props;
  const [family, setFamily] = useState<Family['data']>(fams);
  return (
    <FamilyContext.Provider
      value={{
        data: family,
        setFamily,
      }}>
      {children}
    </FamilyContext.Provider>
  );
};
