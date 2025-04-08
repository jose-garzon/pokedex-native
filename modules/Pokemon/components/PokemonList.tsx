import { FlatList } from 'react-native';
import { useGetPokemonList, usePersistVisitedPokemon } from '../adapters';
import { PokemonCard } from './PokemonCard';
import { Box } from '@/components/ui/box';
import { useEffect, useState } from 'react';
import { Pokemon } from '../types';
import { PokemonModal } from './PokemonModal';
import { ErrorMessage } from './ErrorMessage';
import { useGetGridDimensions } from '@/hooks/useGetGridDimensions';
import { addEmptyItemsToList, searchPokemon } from './utils';
import { LoadingCard } from './LoadingCard';
import { HStack } from '@/components/ui/hstack';
import { EmptyMessage } from './EmptyMessage';

interface PokemonListProps {
  search: string;
}

export function PokemonList({ search }: PokemonListProps) {
  const [showPokemon, setShowPokemon] = useState<Pokemon | null>(null);
  const { data: pokeList, isLoading, error, getNextPage } = useGetPokemonList();
  const { checkIfVisited } = usePersistVisitedPokemon();

  const [itemHeight, setItemHeight] = useState<number>(118);
  const { numCols, minItemsToShowInScreen } = useGetGridDimensions(itemHeight);
  const searchedList = searchPokemon(pokeList ?? [], search);
  const pokeListWithEmptyItems =
    (pokeList?.length ?? 0) > 0 ? addEmptyItemsToList(searchedList, numCols) : [];

  useEffect(() => {
    const listLength = pokeList?.length ?? 0;
    if (listLength < minItemsToShowInScreen && !search) {
      getNextPage();
    }
  }, [pokeList, search]);
  if (error) {
    return <ErrorMessage title="Something went wrong" message="Please try again later." />;
  }

  return (
    <>
      {pokeList && searchedList.length === 0 && !isLoading ? (
        <EmptyMessage />
      ) : (
        <FlatList
          data={pokeListWithEmptyItems}
          role="list"
          className="mt-5"
          keyExtractor={item => item?.id?.toString() ?? 'empty'}
          renderItem={({ item, index }) =>
            item === null ? (
              <LoadingCard key={`empty-${index}`} isLoading={isLoading} />
            ) : (
              <Box
                className={`flex-1 aspect-square`}
                role="listitem"
                key={item.id}
                onLayout={event => {
                  if (item.id !== 1) return;
                  const { height } = event.nativeEvent.layout;
                  setItemHeight(height);
                }}
              >
                <PokemonCard
                  pokemon={item}
                  onPress={() => setShowPokemon(item)}
                  visited={checkIfVisited(item.id)}
                />
              </Box>
            )
          }
          onEndReached={getNextPage}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            isLoading ? (
              <HStack className="flex-1 w-full">
                <LoadingCard isLoading={isLoading} count={numCols} />
              </HStack>
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
