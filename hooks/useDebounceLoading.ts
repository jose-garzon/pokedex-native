import { useEffect, useState } from 'react';

export function useDebounceLoading(value: boolean, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (value) {
      setDebouncedValue(true);
    } else {
      const timer = setTimeout(() => {
        setDebouncedValue(false);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [value, delay]);

  return debouncedValue;
}
