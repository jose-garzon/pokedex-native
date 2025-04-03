import { Box } from '@/components/ui/box';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';

const MAX_VALUE = 200;
export function Stat({ name, value }: { name: string; value: number }) {
  return (
    <Box className="flex items-center">
      <Text className="text-sm">{name}</Text>
      <Progress value={value} max={MAX_VALUE} size="sm">
        <ProgressFilledTrack />
      </Progress>
    </Box>
  );
}
