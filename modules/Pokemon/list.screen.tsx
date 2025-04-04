import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { PokemonList } from './components/PokemonList';
import { useState } from 'react';
import { useGetPokemon } from './modals';
import useDebounce from '@/hooks/useDebounce';
import { PokemonDetails } from './components/PokemonDetails';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';

export function PokeListScreen() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const { data: foundPokemon, isLoading } = useGetPokemon(debouncedSearch);

  const handleInputChange = (text: string) => {
    setSearch(text);
  };

  return (
    <Box className="p-4">
      <Heading className=" text-6xl text-typography-300">Pokedex</Heading>
      <Text className=" text-xl text-typography-300">Gotta catch 'em all</Text>
      <Text className=" text-lg text-typography-300 mt-10 mb-4">
        Find your favorite pokemons and see their details.
      </Text>
      <Input size="xl" variant="rounded" className="mb-4">
        <InputField onChangeText={handleInputChange} placeholder="Name or pokedex number..." />
      </Input>
      {isLoading && <Spinner size="large" color="#fff" />}
      {foundPokemon && <PokemonDetails pokemon={foundPokemon} />}
      {!foundPokemon && !isLoading && <PokemonList />}
    </Box>
  );
}
