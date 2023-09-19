import React from "react";

type props = {
  children: React.ReactNode;
};

const FeedLayout: React.FC<props> = ({ children }) => {
  return (
    <div style={{ backgroundColor: "rgba(260, 260, 260, 1)" }}>{children}</div>
  );
};

export default FeedLayout;
