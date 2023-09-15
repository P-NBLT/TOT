import React from "react";
import UserProvider from "./userProvider";
import ToastProvider from "./toastProvider";

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): React.ReactNode => {
  return (
    <ToastProvider>
      <UserProvider>{children}</UserProvider>
    </ToastProvider>
  );
};

export default GlobalProvider;
