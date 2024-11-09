import { useState, useEffect } from "react";

export const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    const handleResize = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    setIsMobile(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return isMobile;
};
