import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { fetchPokeList } from './services';

export function PokeListScreen() {
  useEffect(() => {
    fetchPokeList(10);
  }, []);
  return (
    <Box className="flex-1 bg-black h-[100vh]">
      <ScrollView style={{ height: '100%' }} contentContainerStyle={{ flexGrow: 1 }}>
        <Heading size="2xl" className="text-white">
          Pokedex
        </Heading>
        <Input>
          <InputField placeholder="Enter Text here..." />
        </Input>
      </ScrollView>
    </Box>
  );
}
