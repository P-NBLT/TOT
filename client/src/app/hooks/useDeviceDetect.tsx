"use client";
import { useEffect, useState } from "react";

export const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    (function detectDevice() {
      const userAgent = navigator.userAgent;
      const value = /mobile|android/gi.test(userAgent);
      const value2 = /tablet/gi.test(userAgent);
      setIsMobile(value);
      setIsTablet(value2);
      setIsDesktop(!value && !value2);
    })();
  }, []);

  return { isMobile, isTablet, isDesktop };
};
