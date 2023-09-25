import React from "react";
import SocketProvider from "../controllers/socketProvider";

type PortalLayoutProps = {
  children: React.ReactNode;
};

const PortalLayout: React.FC<PortalLayoutProps> = ({ children }) => {
  return <SocketProvider>{children}</SocketProvider>;
};

export default PortalLayout;
