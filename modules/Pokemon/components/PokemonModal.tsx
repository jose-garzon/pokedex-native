import { Pokemon } from '../types';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
} from '@/components/ui/actionsheet';
import { ActionsheetDragIndicator } from '@/components/ui/select/select-actionsheet';
import { PokemonDetails } from './PokemonDetails';

interface ScreenProps {
  pokemon: Pokemon | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PokemonModal({ pokemon, isOpen, onClose }: ScreenProps) {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <PokemonDetails pokemon={pokemon} />
      </ActionsheetContent>
    </Actionsheet>
  );
}
