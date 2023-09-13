import React from "react";
import UserProvider from "./userProvider";

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <UserProvider>{children}</UserProvider>;
};

export default GlobalProvider;
