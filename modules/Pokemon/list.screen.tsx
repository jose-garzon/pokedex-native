import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { PokemonList } from './components/PokemonList';

export function PokeListScreen() {
  return (
    <Box className="flex-1 bg-black h-[100vh]">
      <Heading size="2xl" className="text-white">
        Pokedex
      </Heading>
      <Input>
        <InputField placeholder="Enter Text here..." />
      </Input>

      <PokemonList />
    </Box>
  );
}
