import { Pokemon } from '../types';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
} from '@/components/ui/actionsheet';
import { ActionsheetDragIndicator } from '@/components/ui/select/select-actionsheet';
import { PokemonDetails } from './PokemonDetails';
import { Button, ButtonText } from '@/components/ui/button';

interface ScreenProps {
  pokemon: Pokemon | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PokemonModal({ pokemon, isOpen, onClose }: ScreenProps) {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent className="md:w-2/3 lg:w-1/2 md:mx-auto lg:mx-auto">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <PokemonDetails pokemon={pokemon} />
        <Button onPress={onClose} variant="outline" className="w-full mt-4">
          <ButtonText>Close</ButtonText>
        </Button>
      </ActionsheetContent>
    </Actionsheet>
  );
}
