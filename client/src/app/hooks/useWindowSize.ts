import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [height, setHeight] = useState<number | undefined>();
  const [width, setWidth] = useState<number | undefined>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
  }, []);

  return { height, width };
};
