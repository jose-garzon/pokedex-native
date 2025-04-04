import { Box } from '@/components/ui/box';
import { Pokemon } from '../types';
import { Image } from '@/components/ui/image';
import { Pressable } from '@/components/ui/pressable';
import { useRef, useEffect } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

interface PokemonCardProps {
  pokemon: Pokemon;
  onPress: () => void;
  visited: boolean;
}

export function PokemonCard({ pokemon, onPress, visited }: PokemonCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(visited ? 1 : 0.5)).current;

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: visited ? 1 : 0.5,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visited, opacityAnim]);

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.9,
      duration: 150,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      className="p-1"
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.pressableContainer}
    >
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }
        ]}
      >
        <Box
          aria-label={`${pokemon.name} card`}
          aria-selected={visited}
          className={`p-2 h-full w-full aspect-square justify-between rounded-md ${visited ? 'bg-background-50' : 'bg-background-800'}`}
        >
          <Image
            source={{ uri: pokemon.baseImage }}
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
  animatedContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
  }
});
