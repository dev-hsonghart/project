import { useEffect, useRef } from 'react';

export const useTimeout = (callback: () => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const set = () => {
    timeoutRef.current = setTimeout(callback, delay);
  };

  const clear = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    const timer = setTimeout(callback, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [callback, delay]);

  return { set, clear };
};
