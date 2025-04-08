import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { PokemonList } from './components/PokemonList';
import { useState } from 'react';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { RefreshButton } from './components/RefreshButton';

export function PokeListScreen() {
  const [search, setSearch] = useState('');
  const handleInputChange = (text: string) => {
    setSearch(text);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Box className="p-4 flex-1">
        <Heading className="text-6xl text-white">Pokedex</Heading>
        <Text className="text-xl text-white">Gotta catch 'em all</Text>
        <Text className="text-lg text-white mt-10 mb-4">
          Find your favorite pokemons and see their details.
        </Text>
        <Input size="xl" variant="rounded" className="mb-4">
          <InputField
            value={search}
            onChangeText={handleInputChange}
            placeholder="Name of the pokemon..."
          />
        </Input>
        <PokemonList search={search} />
      </Box>
      <StatusBar style="light" />
      <RefreshButton onPress={() => setSearch('')} />
    </SafeAreaView>
  );
}
