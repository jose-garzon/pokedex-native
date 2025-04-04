import { Center } from '@/components/ui/center';
import { Text } from '@/components/ui/text';
import { Image } from '@/components/ui/image';
import { Pokemon } from '../types';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Stat } from './Stat';
import { VStack } from '@/components/ui/vstack';
import { TypeBadge } from './TypeBadge';
import { Divider } from '@/components/ui/divider';
import { usePermsistVisitedPokemon } from '../adapters';
import { useEffect } from 'react';

interface PokemonDetailsProps {
  pokemon: Pokemon | null;
}

export function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  const { savePokemonVisited } = usePermsistVisitedPokemon();
  useEffect(() => {
    if (pokemon) {
      savePokemonVisited(pokemon.id);
    }
  }, [pokemon, savePokemonVisited]);

  return (
    <>
      {pokemon && (
        <Center className="p-2 w-full">
          <Heading className="pb-3 text-4xl text-center uppercase">{pokemon.name}</Heading>
          <Image
            source={{ uri: pokemon.artImage }}
            alt={pokemon.name}
            className="aspect-square h-72 w-72 my-2"
          />
          <HStack space="md">
            {pokemon.types.map(type => (
              <TypeBadge key={type} type={type} />
            ))}
          </HStack>
          <HStack space="md" className="my-4">
            <Text className="text-lg">Height: {pokemon.height} cm</Text>
            <Divider orientation="vertical" />
            <Text className="text-lg">Weight: {pokemon.weight} kg</Text>
          </HStack>
          <HStack className=" w-full">
            <VStack className="w-1/2 px-2">
              {pokemon.stats.slice(0, 3).map(stat => (
                <Stat key={stat.name} name={stat.name} value={stat.value} />
              ))}
            </VStack>
            <VStack className="w-1/2 px-2">
              {pokemon.stats.slice(3).map(stat => (
                <Stat key={stat.name} name={stat.name} value={stat.value} />
              ))}
            </VStack>
          </HStack>
        </Center>
      )}
    </>
  );
}
