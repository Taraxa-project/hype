import React, { useState, useContext, createContext } from 'react';

type Context = {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
  close: () => void;
};

const initialState: Context = {
  isOpen: false,
  setOpen: () => {},
  close: () => {}
};

const ModalContext = createContext<Context>(initialState);

function useProvideModal()  {
  const [isOpen, setOpen] = useState(false);

  
  const close = () => {
    setOpen(false);
  };  


  return {
    isOpen,
    setOpen,
    close,
  };
}

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const modal = useProvideModal();
  return <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  return useContext(ModalContext);
};
