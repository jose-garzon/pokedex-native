import { Box } from '@/components/ui/box';
import { Center } from '@/components/ui/center';
import { Text } from '@/components/ui/text';
import { useGetPokemon } from '../modals';
import { Image } from '@/components/ui/image';
import { Pokemon } from '../types';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
} from '@/components/ui/actionsheet';
import {
  ActionsheetDragIndicator,
  ActionsheetItem,
  ActionsheetItemText,
} from '@/components/ui/select/select-actionsheet';
import { Heading } from '@/components/ui/heading';
import { View } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { Stat } from './Stat';
import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';
import { VStack } from '@/components/ui/vstack';
import { TypeBadge } from './TypeBadge';

interface ScreenProps {
  pokemon: Pokemon | null;
  isOpen: boolean;
  onClose: () => void;
}

export function Screen({ pokemon, isOpen, onClose }: ScreenProps) {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        {pokemon && (
          <Center className="p-2 w-full">
            <Heading className="pb-5 text-center capitalize">{pokemon.name}</Heading>
            <Image
              source={{ uri: pokemon.artImage }}
              alt={pokemon.name}
              className="aspect-square h-60 w-60"
            />
            <HStack space="md">
              {pokemon.types.map(type => (
                <TypeBadge key={type} type={type} />
              ))}
            </HStack>
            <HStack space="md">
              <Text className="text-lg">Exp: {pokemon.experience}</Text>
              <Text className="text-lg">Height: {pokemon.height} cm</Text>
              <Text className="text-lg">Weight: {pokemon.weight} kg</Text>
            </HStack>
            <HStack className=" w-full">
              <VStack className="w-1/2 px-2">
                {pokemon.stats.slice(0, 3).map(stat => (
                  <Stat key={stat.name} name={stat.name} value={stat.value} />
                ))}
              </VStack>
              <VStack className="w-1/2 px-2">
                {pokemon.stats.slice(3).map(stat => (
                  <Stat key={stat.name} name={stat.name} value={stat.value} />
                ))}
              </VStack>
            </HStack>
          </Center>
        )}
      </ActionsheetContent>
    </Actionsheet>
  );
}
