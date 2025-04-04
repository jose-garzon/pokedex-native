import { Dimensions, FlatList, useWindowDimensions } from 'react-native';
import { useGetPokemonList, usePermsistVisitedPokemon } from '../adapters';
import { PokemonCard } from './PokemonCard';
import { Box } from '@/components/ui/box';
import { Spinner } from '@/components/ui/spinner';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Pokemon } from '../types';
import { PokemonModal } from './PokemonModal';
import { ErrorMessage } from './ErrorMessage';

export function PokemonList() {
  const [showPokemon, setShowPokemon] = useState<Pokemon | null>(null);
  const { data: pokeList, isLoading, error, getNextPage } = useGetPokemonList();
  const { checkIfVisited } = usePermsistVisitedPokemon();
  const [itemHeight, setItemHeight] = useState<number>(118);
  const { width, height } = useWindowDimensions();

  const columnCount = useMemo(() => {
    if (width >= 1024) return 6;
    if (width >= 768) return 4;
    return 3;
  }, [width]);

  const minItemsToShow = Math.ceil(height / itemHeight);
  useEffect(() => {
    const listLength = pokeList?.length ?? 0;
    if (listLength < minItemsToShow) {
      getNextPage();
    }
  }, [pokeList]);

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
            <Box
              className={`flex-1 aspect-square`}
              role="listitem"
              onLayout={event => {
                if (item.id !== 1) return;
                const { height } = event.nativeEvent.layout;
                setItemHeight(height);
              }}
            >
              <PokemonCard
                key={item.id.toString()}
                pokemon={item}
                onPress={() => setShowPokemon(item)}
                visited={checkIfVisited(item.id)}
              />
            </Box>
          )}
          onEndReached={getNextPage}
          onEndReachedThreshold={1}
          ListFooterComponent={
            isLoading ? (
              <Box className="py-4 items-center mt-2.5 w-full">
                <Spinner size="large" color="white" />
              </Box>
            ) : null
          }
          numColumns={columnCount}
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
