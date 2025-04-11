/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState, useEffect } from "react";
import LogoLoader from "../components/Loader/LogoLoader";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Set a minimum loading time for aesthetic purposes
    const minLoadTime = setTimeout(() => {
      if (document.readyState === "complete") {
        setIsLoading(false);
      }
    }, 1000);

    // Listen for when the page fully loads
    const handleLoad = () => {
      // Instead of immediately setting loading to false, we'll animate the progress
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 5;
        setProgress(currentProgress);

        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 200);
        }
      }, 50);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    // Cleanup
    return () => {
      clearTimeout(minLoadTime);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider
      value={{ isLoading, startLoading, stopLoading, progress }}
    >
      {isLoading && <LogoLoader />}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
