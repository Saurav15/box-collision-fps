import { useState, useEffect } from "react";

// Custom hook to track multiple key presses
export const useMultiKeyPress = () => {
  const [keysPressed, setKeysPressed] = useState({});

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeysPressed((prevKeys) => ({
        ...prevKeys,
        [event.key]: true,
      }));
    };

    const handleKeyUp = (event) => {
      setKeysPressed((prevKeys) => ({
        ...prevKeys,
        [event.key]: false,
      }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keysPressed;
};
