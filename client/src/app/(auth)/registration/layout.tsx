"use client";
import React from "react";
import layoutStyle from "./css/layout.module.css";
import { useWindowSize } from "@/app/hooks/useWindowSize";
export default function Layout({ children }: { children: React.ReactNode }) {
  const { height } = useWindowSize();

  return (
    <>
      <style>{`.${layoutStyle.container} { height: ${height}px;}`}</style>
      <div className={layoutStyle.container}>
        <div className={layoutStyle["upper-content"]} />
        {children}
      </div>
    </>
  );
}
