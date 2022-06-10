import React, { createContext, FC, useContext, useReducer } from 'react';
import { hypeModalsInitialState, hypeModalsReducer } from './reducer';
import { THypeModalsAction, IHypeModalsStore } from './types';

const HypeModalsStore = createContext<IHypeModalsStore>(null);
const HypeModalsDispatch = createContext<React.Dispatch<THypeModalsAction>>(null);

type HypeModalsProviderProps = {
  children: React.ReactNode;
};

export const HypeModalsProvider: FC<HypeModalsProviderProps> = ({
  children,
}: HypeModalsProviderProps) => {
  const [state, dispatch] = useReducer(hypeModalsReducer, hypeModalsInitialState);

  return (
    <HypeModalsStore.Provider value={state}>
      <HypeModalsDispatch.Provider value={dispatch}>{children}</HypeModalsDispatch.Provider>
    </HypeModalsStore.Provider>
  );
};

export const useHypeModalsStore = () => {
  return useContext(HypeModalsStore);
};

export const useHypeModalsDispatch = () => {
  return useContext(HypeModalsDispatch);
};
