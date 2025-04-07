import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
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
    retry: 0,
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
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemon(name),
    enabled: Boolean(name),
    retry: 0,
  });
  return { data, isLoading, error };
}

export function usePersistVisitedPokemon(): {
  savePokemonVisited: (id: number) => void;
  checkIfVisited: (id: number) => boolean;
} {
  const queryClient = useQueryClient();
  const visitedPokemon = queryClient.getQueryData<number[]>(['visited-pokemon']);
  const list = visitedPokemon ?? [];
  function savePokemonVisited(id: number) {
    const updatedList = [...list, id];
    queryClient.setQueryData(['visited-pokemon'], updatedList);
  }
  function checkIfVisited(id: number) {
    return list.includes(id);
  }
  return { savePokemonVisited, checkIfVisited };
}
