"use client";

import React, { useState, useContext, createContext } from "react";
import { Toast } from "../components";

type ctxProps = {
  showToast: (message: string, type: string, time?: number) => void;
};

const ToastContext = createContext<ctxProps | undefined>(undefined);

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): React.ReactNode => {
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const showToast = (message: string, type: string, time: number = 3000) => {
    setMessage(message);
    setShow(true);
    setVariant(type);

    setTimeout(() => {
      setShow(false);
    }, time);
  };
  const value = {
    showToast,
  };
  return (
    <>
      <ToastContext.Provider value={value}>
        <Toast type={variant} message={message} show={show} />
        {children}
      </ToastContext.Provider>
    </>
  );
};

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export default ToastProvider;
