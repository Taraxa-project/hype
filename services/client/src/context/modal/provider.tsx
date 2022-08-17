import React, { createContext, FC, useContext, useReducer } from 'react';
import { modalsInitialState, hypeModalsReducer } from './reducer';
import { TModalsAction, IModalsStore } from './types';

const ModalsStore = createContext<IModalsStore>(null);
const ModalsDispatch = createContext<React.Dispatch<TModalsAction>>(null);

type ModalsProviderProps = {
  children: React.ReactNode;
};

export const ModalsProvider: FC<ModalsProviderProps> = ({
  children,
}: ModalsProviderProps) => {
  const [state, dispatch] = useReducer(hypeModalsReducer, modalsInitialState);

  return (
    <ModalsStore.Provider value={state}>
      <ModalsDispatch.Provider value={dispatch}>{children}</ModalsDispatch.Provider>
    </ModalsStore.Provider>
  );
};

export const useModalsStore = () => {
  return useContext(ModalsStore);
};

export const useModalsDispatch = () => {
  return useContext(ModalsDispatch);
};
