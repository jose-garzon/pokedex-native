import { Box } from '@/components/ui/box';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

interface LoadingCardProps {
  isLoading: boolean;
  count?: number;
}

export function LoadingCard({ isLoading, count = 1 }: LoadingCardProps) {
  const shimmerOpacity = useSharedValue(0);

  useEffect(() => {
    if (isLoading) {
      shimmerOpacity.value = withRepeat(
        withTiming(1, {
          duration: 600,
        }),
        -1,
        true
      );
    } else {
      shimmerOpacity.value = 0;
    }
  }, [isLoading]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: shimmerOpacity.value,
  }));

  return Array.from({ length: count }).map((_, index) => (
    <Box key={index} className={`flex-1 aspect-square`}>
      <Box className="flex-1 w-full h-full p-1">
        <Animated.View className="w-full h-full rounded-md bg-neutral-700" style={animatedStyle} />
      </Box>
    </Box>
  ));
}
