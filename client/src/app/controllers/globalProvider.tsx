"use client";
import React from "react";
import UserProvider from "./userProvider";
import ToastProvider from "./toastProvider";
import { useWindowSize } from "../hooks/useWindowSize";

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): React.ReactNode => {
  const { width } = useWindowSize();
  if (width! > 900 || width! <= 500) {
    return (
      <ToastProvider>
        <UserProvider>{children}</UserProvider>
      </ToastProvider>
    );
  } else if (!width) {
    return <div style={STYLE}>Loading...</div>;
  } else return <div style={STYLE}>Not supported</div>;
};

export default GlobalProvider;

const STYLE = {
  widht: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
