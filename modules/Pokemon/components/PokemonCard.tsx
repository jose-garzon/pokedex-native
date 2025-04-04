import { Box } from '@/components/ui/box';
import { Pokemon } from '../types';
import { Image } from '@/components/ui/image';
import { Pressable } from '@/components/ui/pressable';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing as ReanimatedEasing,
} from 'react-native-reanimated';

interface PokemonCardProps {
  pokemon: Pokemon;
  onPress: () => void;
  visited: boolean;
}

export function PokemonCard({ pokemon, onPress, visited }: PokemonCardProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(visited ? 1 : 0.5);

  useEffect(() => {
    opacity.value = withTiming(visited ? 1 : 0.5, {
      duration: 300,
    });
  }, [visited, opacity]);

  const handlePressIn = () => {
    scale.value = withTiming(0.9, {
      duration: 150,
      easing: ReanimatedEasing.out(ReanimatedEasing.cubic),
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 10,
      stiffness: 100,
    });
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
      flex: 1,
      height: '100%',
      width: '100%',
    };
  });

  return (
    <Pressable
      className="p-1"
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.pressableContainer}
    >
      <Animated.View style={animatedStyles}>
        <Box
          aria-label={`${pokemon.name} card`}
          className={`p-2 h-full w-full aspect-square justify-between rounded-md ${visited ? 'bg-background-50' : 'bg-background-800'}`}
        >
          <Image
            source={{ uri: pokemon.baseImage }}
            aria-selected={visited}
            alt={pokemon.name}
            className="aspect-square w-full h-full object-contain"
          />
        </Box>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
