import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';

export function useGetGridDimensions(itemHeight: number): {
  numCols: number;
  minItemsToShowInScreen: number;
} {
  const [numCols, setNumCols] = useState(3);
  const { width, height } = useWindowDimensions();

  const minItemsToShowInScreen = Math.ceil(height / itemHeight) * numCols;

  useEffect(() => {
    if (width < 512) setNumCols(3);
    if (width >= 512 && width < 672) setNumCols(4);
    if (width >= 672 && width < 1024) setNumCols(6);
    if (width >= 1024) setNumCols(12);
  }, [width]);
  return { numCols, minItemsToShowInScreen };
}
