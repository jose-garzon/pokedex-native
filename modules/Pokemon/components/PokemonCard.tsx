import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Pokemon } from '../types';
import { Image } from '@/components/ui/image';
import { Pressable } from '@/components/ui/pressable';

interface PokemonCardProps {
  pokemon: Pokemon;
  onPress: () => void;
}

export function PokemonCard({ pokemon, onPress }: PokemonCardProps) {
  return (
    <>
      <Pressable className="p-2 h-full aspect-square" onPress={onPress}>
        <Box className="flex relative items-center h-full">
          <Text className="absolute bottom-0 left-0 text-5xl">{pokemon.id}</Text>
          <Image
            source={{ uri: pokemon.baseImage }}
            alt={pokemon.name}
            className="aspect-square h-full w-full object-fill"
          />
        </Box>
        <Text className="font-bold capitalize">{pokemon.name}</Text>
      </Pressable>
    </>
  );
}
