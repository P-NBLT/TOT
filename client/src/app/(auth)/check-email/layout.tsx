import React from "react";

type props = {
  children: React.ReactNode;
};

const CheckEmailLayout: React.FC<props> = ({ children }) => {
  return (
    <div style={{ backgroundColor: "black", height: "100vh" }}>{children}</div>
  );
};

export default CheckEmailLayout;
