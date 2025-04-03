import { PokeList, PokeListResponse, Pokemon, PokemonResponse } from './types';

const PAGE_LIMIT = 10;

async function fetchPokemonListData(name: string): Promise<Pokemon> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon');
  }
  const data = (await response.json()) as PokemonResponse;
  return {
    id: data.id,
    name: data.name,
    artImage: data.sprites.other['official-artwork'].front_default,
    baseImage: data.sprites.front_default,
    experience: data.base_experience,
    stats: data.stats.map(stat => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
    types: data.types.map(type => type.type.name),
    weight: data.weight,
  };
}

export async function fetchPokeList(offset: number): Promise<PokeList> {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_LIMIT}&offset=${offset}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon list');
  }
  const data = (await response.json()) as PokeListResponse;
  const nextOffset = data.next ? Number(new URL(data.next).searchParams.get('offset')) : null;
  const results = data.results;
  const resultsDetails = results.map(async (result: { name: string }) => {
    return fetchPokemonListData(result.name);
  });
  const pokemonList = await Promise.all(resultsDetails);
  return { next: nextOffset, results: pokemonList };
}
