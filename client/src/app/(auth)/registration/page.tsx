"use client";
import React, { useState } from "react";
import Login from "./login";
import Signup from "./signup";

const Registration: React.FC = () => {
  const [isLoginCard, setIsLoginCard] = useState<boolean>(true);

  function toggleState() {
    setIsLoginCard(!isLoginCard);
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        marginRight: "10%",
        height: "100%",
      }}
    >
      {isLoginCard && <Login toggleState={toggleState} />}
      {!isLoginCard && <Signup toggleState={toggleState} />}
    </div>
  );
};

export default Registration;
