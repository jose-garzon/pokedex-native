import { Dimensions, FlatList } from 'react-native';
import { useGetPokemonList } from '../modals';
import { PokemonCard } from './PokemonCard';
import { Box } from '@/components/ui/box';
import { Spinner } from '@/components/ui/spinner';
import { useState } from 'react';
import { Pokemon } from '../types';
import { Screen } from './Screen';

const COLUMN_COUNT = 4;

export function PokemonList() {
  const [showPokemon, setShowPokemon] = useState<Pokemon | null>(null);
  const { data: pokeList, isLoading, error, getNextPage } = useGetPokemonList();

  return (
    <>
      <FlatList
        data={pokeList}
        className="my-5"
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Box
            className={`flex-1 ${
              Dimensions.get('window').width < 640 ? 'w-1/2' : 'w-1/3'
            } aspect-square`}
          >
            <PokemonCard
              key={item.id.toString()}
              pokemon={item}
              onPress={() => setShowPokemon(item)}
            />
          </Box>
        )}
        onEndReached={getNextPage}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading ? (
            <Box className="py-4 items-center mt-2.5 w-full">
              <Spinner size="large" color="#000" />
            </Box>
          ) : null
        }
        numColumns={Dimensions.get('window').width < 640 ? 3 : COLUMN_COUNT}
      />

      <Screen
        pokemon={showPokemon}
        isOpen={Boolean(showPokemon)}
        onClose={() => setShowPokemon(null)}
      />
    </>
  );
}
