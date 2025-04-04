import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { PokemonList } from './components/PokemonList';
import { useState } from 'react';
import { useGetPokemon } from './adapters';
import useDebounce from '@/hooks/useDebounce';
import { PokemonDetails } from './components/PokemonDetails';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ErrorMessage } from './components/ErrorMessage';
import { SafeAreaView } from 'react-native-safe-area-context';

export function PokeListScreen() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const { data: foundPokemon, isLoading, error } = useGetPokemon(debouncedSearch);
  const handleInputChange = (text: string) => {
    setSearch(text);
  };

  return (
    <SafeAreaView className="flex-1">
      <Box className="p-4 flex-1">
        <Heading className="text-6xl text-typography-300">Pokedex</Heading>
        <Text className="text-xl text-typography-300">Gotta catch 'em all</Text>
        <Text className="text-lg text-typography-300 mt-10 mb-4">
          Find your favorite pokemons and see their details.
        </Text>
        <Input size="xl" variant="rounded" className="mb-4">
          <InputField onChangeText={handleInputChange} placeholder="Name or pokedex number..." />
        </Input>
        {Boolean(error) && (
          <ErrorMessage
            title="Pokemon not found"
            message="Change the name or pokedex number and try again."
          />
        )}
        {isLoading && <Spinner size="large" color="black" />}
        {foundPokemon && (
          <Animated.View
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(300)}
            style={{ width: '100%' }}
          >
            <PokemonDetails pokemon={foundPokemon} />
          </Animated.View>
        )}
        {!search && !isLoading && !error && <PokemonList />}
      </Box>
    </SafeAreaView>
  );
}
