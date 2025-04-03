import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { PokemonList } from './components/PokemonList';
import { useState } from 'react';
import { useGetPokemon } from './modals';

export function PokeListScreen() {
  const [search, setSearch] = useState('');

  const { data } = useGetPokemon(search);

  const handleInputChange = (text: string) => {
    setSearch(text);
  };

  return (
    <Box className="p-4 bg-slate-800">
      <Heading size="2xl">Pokedex</Heading>
      <Input>
        <InputField onChangeText={handleInputChange} placeholder="Enter Pokemon name..." />
      </Input>
      <PokemonList />
    </Box>
  );
}
