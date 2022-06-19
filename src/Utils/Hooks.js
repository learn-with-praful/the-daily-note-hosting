import { useState, useEffect } from "react";

export function getStorageValue(key, defaultValue) {
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial ?? defaultValue;
}

export const useStorage = (key, defaultValue, other = {}) => {
  const [value, setValue] = useState(() => {
    return typeof other.generateState === "function"
      ? other.generateState()
      : getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
