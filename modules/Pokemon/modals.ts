import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchPokeList, fetchPokemon } from './services';

export function useGetPokemonList() {
  const { data, isLoading, error } = useInfiniteQuery({
    queryKey: ['pokemon-list'],
    queryFn: ({ pageParam }) => fetchPokeList(pageParam),
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.next,
  });

  return { data, isLoading, error };
}

export function useGetPokemon(name: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemon'],
    queryFn: () => fetchPokemon(name),
  });
  return { data, isLoading, error };
}
