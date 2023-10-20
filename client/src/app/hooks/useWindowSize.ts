"use client";
import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [height, setHeight] = useState<number | undefined>();
  const [width, setWidth] = useState<number | undefined>();
  const [clientWidth, setClientWidth] = useState<number | undefined>();

  useEffect(() => {
    function handleSize() {
      if (typeof window !== "undefined") {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        setClientWidth(document.documentElement.clientWidth);
      }
    }

    handleSize();
    window.addEventListener("resize", handleSize);

    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return { height, width, clientWidth };
};
