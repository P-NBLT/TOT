import React from "react";

type props = {
  children: React.ReactNode;
};

const CenterDiv: React.FC<props> = ({ children }) => {
  const style = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };
  //@ts-ignore
  return <div style={style}>{children}</div>;
};

export default CenterDiv;
