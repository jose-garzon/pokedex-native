import { Dimensions, FlatList, View } from 'react-native';
import { useGetPokemonList, usePermsistVisitedPokemon } from '../modals';
import { PokemonCard } from './PokemonCard';
import { Box } from '@/components/ui/box';
import { Spinner } from '@/components/ui/spinner';
import { useState } from 'react';
import { Pokemon } from '../types';
import { Screen } from './Screen';

const COLUMN_COUNT = 6;

export function PokemonList() {
  const [showPokemon, setShowPokemon] = useState<Pokemon | null>(null);
  const { data: pokeList, isLoading, error, getNextPage } = useGetPokemonList();
  const { checkIfVisited, savePokemonVisited } = usePermsistVisitedPokemon();

  function handleVisitPokemon(pokemon: Pokemon) {
    setShowPokemon(pokemon);
    savePokemonVisited(pokemon.id);
  }
  return (
    <>
      <FlatList
        data={pokeList}
        className="mt-5"
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
          <Box className={`flex-1 aspect-square`}>
            <PokemonCard
              key={item.id.toString()}
              pokemon={item}
              onPress={() => handleVisitPokemon(item)}
              visited={checkIfVisited(item.id)}
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
