import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    } else {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    }
  });

  const setStorageValue = (value: T) => {
    try {
      setValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [value, setStorageValue];
}

export default useLocalStorage;
