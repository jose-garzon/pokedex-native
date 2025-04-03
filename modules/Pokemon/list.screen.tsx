import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { fetchPokeList } from './services';
import { useGetPokemonList } from './modals';
import { PokemonCard } from './components/PokemonCard';

export function PokeListScreen() {
  const { data: pokeList, isLoading, error, getNextPage } = useGetPokemonList();

  return (
    <Box className="flex-1 bg-black h-[100vh]">
      <Heading size="2xl" className="text-white">
        Pokedex
      </Heading>
      <Input>
        <InputField placeholder="Enter Text here..." />
      </Input>

      <FlatList
        data={pokeList}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        keyExtractor={item => item.id.toString()}
        onEndReached={getNextPage}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading ? (
            <Box className="py-4 items-center">
              <ActivityIndicator size="large" color="#000" />
            </Box>
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Box>
  );
}
