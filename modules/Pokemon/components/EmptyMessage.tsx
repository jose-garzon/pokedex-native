import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import Pokeball from '@/assets/images/pokeball.png';

export function EmptyMessage() {
  return (
    <Box className="flex-1 items-center mt-20">
      <Image
        source={Pokeball}
        size="2xl"
        alt="No pokemons found"
        className="aspect-square object-contain"
      />
      <Text className="text-white text-2xl">No pokemons found</Text>
    </Box>
  );
}
