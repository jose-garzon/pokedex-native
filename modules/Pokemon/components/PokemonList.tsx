import { ActivityIndicator, FlatList } from 'react-native';
import { useGetPokemonList } from '../modals';
import { PokemonCard } from './PokemonCard';
import { Box } from '@/components/ui/box';

export function PokemonList() {
  const { data: pokeList, isLoading, error, getNextPage } = useGetPokemonList();
  return (
    <FlatList
      data={pokeList}
      renderItem={({ item }) => <PokemonCard key={item.id.toString()} pokemon={item} />}
      keyExtractor={item => item.id.toString()}
      onEndReached={getNextPage}
      onEndReachedThreshold={0.5}
      numColumns={3}
      ListFooterComponent={
        isLoading ? (
          <Box className="py-4 items-center">
            <ActivityIndicator size="large" color="#000" />
          </Box>
        ) : null
      }
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}
