"use client";
import React, { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import pageStyles from "./css/page.module.css";

const Registration: React.FC = () => {
  const [isLoginCard, setIsLoginCard] = useState<boolean>(true);

  function toggleState() {
    setIsLoginCard(!isLoginCard);
  }

  return (
    <div className={pageStyles.body}>
      {isLoginCard && <Login toggleState={toggleState} />}
      {!isLoginCard && <Signup toggleState={toggleState} />}
    </div>
  );
};

export default Registration;
