import { Dimensions, FlatList } from 'react-native';
import { useGetPokemonList, usePermsistVisitedPokemon } from '../adapters';
import { PokemonCard } from './PokemonCard';
import { Box } from '@/components/ui/box';
import { Spinner } from '@/components/ui/spinner';
import { useState } from 'react';
import { Pokemon } from '../types';
import { PokemonModal } from './PokemonModal';
import { ErrorMessage } from './ErrorMessage';

const COLUMN_COUNT = 6;

export function PokemonList() {
  const [showPokemon, setShowPokemon] = useState<Pokemon | null>(null);
  const { data: pokeList, isLoading, error, getNextPage } = useGetPokemonList();
  console.log(pokeList);
  const { checkIfVisited } = usePermsistVisitedPokemon();

  return (
    <>
      {Boolean(error) ? (
        <ErrorMessage title="Something went wrong" message="Please try again later." />
      ) : (
        <FlatList
          data={pokeList}
          role="list"
          className="mt-5"
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Box className={`flex-1 aspect-square`} role="listitem">
              <PokemonCard
                key={item.id.toString()}
                pokemon={item}
                onPress={() => setShowPokemon(item)}
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
      )}
      <PokemonModal
        pokemon={showPokemon}
        isOpen={Boolean(showPokemon)}
        onClose={() => setShowPokemon(null)}
      />
    </>
  );
}
