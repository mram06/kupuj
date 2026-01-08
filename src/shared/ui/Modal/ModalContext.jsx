import { createContext, useContext, useRef } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const callbackRef = useRef(null);

  const setCallback = (callback) => {
    callbackRef.current = callback;
  };

  const getCallback = () => callbackRef.current;

  return (
    <ModalContext.Provider value={{ setCallback, getCallback }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalCallback = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalCallback must be used within ModalProvider");
  }
  return context;
};
