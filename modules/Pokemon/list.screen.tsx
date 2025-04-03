import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { PokemonList } from './components/PokemonList';
import { useState } from 'react';
import { useGetPokemon } from './modals';
import useDebounce from '@/hooks/useDebounce';
import { PokemonDetails } from './components/PokemonDetails';
import { Spinner } from '@/components/ui/spinner';

export function PokeListScreen() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const { data: foundPokemon, isLoading } = useGetPokemon(debouncedSearch);

  const handleInputChange = (text: string) => {
    setSearch(text);
  };

  return (
    // <Box className="p-4 bg-slate-800">
    <Box className="p-4 ">
      <Heading size="2xl">Pokedex</Heading>
      <Input>
        <InputField onChangeText={handleInputChange} placeholder="Enter Pokemon name..." />
      </Input>
      {isLoading && <Spinner size="large" color="#fff" />}
      {foundPokemon && <PokemonDetails pokemon={foundPokemon} />}
      {!foundPokemon && !isLoading && <PokemonList />}
    </Box>
  );
}
