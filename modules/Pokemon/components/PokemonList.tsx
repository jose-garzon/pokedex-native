import { FlatList, Platform, useWindowDimensions } from 'react-native';
import { useGetPokemonList, usePersistVisitedPokemon } from '../adapters';
import { PokemonCard } from './PokemonCard';
import { Box } from '@/components/ui/box';
import { Spinner } from '@/components/ui/spinner';
import { useEffect, useState } from 'react';
import { Pokemon } from '../types';
import { PokemonModal } from './PokemonModal';
import { ErrorMessage } from './ErrorMessage';

export function PokemonList() {
  const [showPokemon, setShowPokemon] = useState<Pokemon | null>(null);
  const { data: pokeList, isLoading, error, getNextPage } = useGetPokemonList();
  const { checkIfVisited } = usePersistVisitedPokemon();
  const [itemHeight, setItemHeight] = useState<number>(118);
  const { numCols, minItemsToShowInScreen } = useGetGridDimensions(itemHeight);
  const parsedList = addEmptyItems(pokeList ?? [], numCols);

  useEffect(() => {
    const listLength = pokeList?.length ?? 0;
    if (listLength < minItemsToShowInScreen) {
      getNextPage();
    }
  }, [pokeList]);
  return (
    <>
      {Boolean(error) ? (
        <ErrorMessage title="Something went wrong" message="Please try again later." />
      ) : (
        <FlatList
          data={parsedList}
          role="list"
          className="mt-5"
          keyExtractor={item => item?.id?.toString() ?? 'empty'}
          renderItem={({ item }) =>
            item === null ? (
              <Box className="flex-1 aspect-square opacity-0" />
            ) : (
              <Box
                className={`flex-1 aspect-square`}
                role="listitem"
                onLayout={event => {
                  if (item.id !== 1 && Platform.OS === 'web') return;
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
            )
          }
          // onEndReached={getNextPage}
          onEndReachedThreshold={1}
          ListFooterComponent={
            isLoading ? (
              <Box className="py-4 items-center mt-2.5 w-full">
                <Spinner size="large" color="white" />
              </Box>
            ) : null
          }
          key={numCols}
          numColumns={numCols}
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

function useGetGridDimensions(itemHeight: number): {
  numCols: number;
  minItemsToShowInScreen: number;
} {
  const [numCols, setNumCols] = useState(3);
  const { width, height } = useWindowDimensions();

  const minItemsToShowInScreen = Math.ceil(height / itemHeight) * numCols;

  useEffect(() => {
    if (width < 768) setNumCols(3);
    if (width >= 1024) setNumCols(6);
    if (width >= 768) setNumCols(4);
  }, [width]);
  return { numCols, minItemsToShowInScreen };
}

function addEmptyItems(pokeList: Pokemon[], columnCount: number): Pokemon[] {
  const numberOfElementsLastRow = (pokeList?.length ?? 0) % columnCount;
  const emptyMissing = columnCount - numberOfElementsLastRow;
  return [...(pokeList ?? []), ...Array(emptyMissing).fill(null)];
}
