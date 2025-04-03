import { Text } from '@/components/ui/text';
import { getTypeColor } from './utils';

export function TypeBadge({ type }: { type: string }) {
  const { background, color } = getTypeColor(type);
  return (
    <Text
      style={{ backgroundColor: background, color }}
      className={`text-md capitalize px-5 py-1 rounded-full`}
    >
      {type}
    </Text>
  );
}
