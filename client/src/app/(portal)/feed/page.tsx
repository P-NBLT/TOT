"use client";
import { NavBar } from "@/app/components";
import React from "react";
import View from "./view";
type props = {
  children: React.ReactNode;
};

const FeedPage: React.FC<props> = ({ children }) => {
  return (
    <>
      <NavBar type="private" />
      <div style={{ maxWidth: "100%", width: "100%", paddingTop: 70 }}>
        <View />
      </div>
      {children}
    </>
  );
};

export default FeedPage;
