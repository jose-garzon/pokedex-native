import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { PokemonList } from './components/PokemonList';

export function PokeListScreen() {
  return (
    <Box className="p-4">
      <Heading size="2xl">Pokedex</Heading>
      <Input>
        <InputField placeholder="Enter Pokemon name..." />
      </Input>
      <PokemonList />
    </Box>
  );
}
