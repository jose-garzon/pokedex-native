import { Box } from '@/components/ui/box';
import { Pokemon } from '../types';
import { Image } from '@/components/ui/image';
import { Pressable } from '@/components/ui/pressable';

interface PokemonCardProps {
  pokemon: Pokemon;
  onPress: () => void;
  visited: boolean;
}

export function PokemonCard({ pokemon, onPress, visited }: PokemonCardProps) {
  const visitedClass = visited ? 'opacity-100 bg-slate-700' : 'opacity-50';
  return (
    <Pressable className="p-1" onPress={onPress}>
      <Box
        aria-label={`${pokemon.name} card`}
        aria-selected={visited}
        className={`p-2 h-full aspect-square justify-between rounded-md ${visitedClass}`}
      >
        <Image
          source={{ uri: pokemon.baseImage }}
          alt={pokemon.name}
          className="aspect-square w-full h-full object-contain"
        />
      </Box>
    </Pressable>
  );
}
