import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Pokemon } from '../types';
import { Image } from '@/components/ui/image';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Box>
      <Text>{pokemon.name}</Text>
      <Image source={{ uri: pokemon.artImage }} alt={pokemon.name} />
    </Box>
  );
}
