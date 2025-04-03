import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchPokeList, fetchPokemon } from './services';
import { Pokemon } from './types';

export function useGetPokemonList(): {
  data: Pokemon[] | undefined;
  isLoading: boolean;
  error: unknown;
  getNextPage: () => Promise<void>;
} {
  const { data, error, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['pokemon-list'],
    queryFn: ({ pageParam }) => fetchPokeList(pageParam),
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.next,
  });

  async function getNextPage() {
    if (hasNextPage && !isFetching) {
      await fetchNextPage();
    }
  }
  const pokemons = data?.pages.flatMap(page => page.results) ?? [];
  return { data: pokemons, isLoading: isFetching, error, getNextPage };
}

export function useGetPokemon(name: string): {
  data: Pokemon | undefined;
  isLoading: boolean;
  error: unknown;
} {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemon'],
    queryFn: () => fetchPokemon(name),
  });
  return { data, isLoading, error };
}
