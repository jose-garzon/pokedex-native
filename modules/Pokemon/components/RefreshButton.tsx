import { Fab, FabIcon, FabLabel } from '@/components/ui/fab';

interface RefreshButtonProps {
  onPress: () => void;
}

export function RefreshButton({ onPress }: RefreshButtonProps) {
  return (
    <Fab placement="bottom right" onPress={onPress}>
      <FabLabel>Show List</FabLabel>
    </Fab>
  );
}
