import { Pokemon } from '../types';

export function getTypeColor(type: string): { background: string; color: string } {
  const typeColors: Record<string, { background: string; color: string }> = {
    normal: { background: '#A8A090', color: 'white' },
    fighting: { background: '#A05038', color: 'white' },
    flying: { background: '#98A8F0', color: 'black' },
    poison: { background: '#B058A0', color: 'white' },
    ground: { background: '#E9D6A4', color: 'black' },
    rock: { background: '#B8A058', color: 'white' },
    bug: { background: '#A8B820', color: 'black' },
    ghost: { background: '#6060B0', color: 'white' },
    steel: { background: '#A8A8C0', color: 'black' },
    fire: { background: '#F05030', color: 'white' },
    water: { background: '#3899F8', color: 'black' },
    grass: { background: '#78C850', color: 'black' },
    electric: { background: '#F8D030', color: 'black' },
    psychic: { background: '#F870A0', color: 'black' },
    ice: { background: '#58C8E0', color: 'white' },
    dragon: { background: '#7860E0', color: 'white' },
    dark: { background: '#7A5848', color: 'white' },
    fairy: { background: '#E79FE7', color: 'white' },
  };

  return typeColors[type] || typeColors.normal;
}

export function addEmptyItemsToList(pokeList: Pokemon[], columnCount: number): Pokemon[] {
  const numberOfElementsLastRow = (pokeList?.length ?? 0) % columnCount;
  const emptyMissing = columnCount - numberOfElementsLastRow;
  return [...(pokeList ?? []), ...Array(emptyMissing).fill(null)];
}

export function searchPokemon(pokeList: Pokemon[], search: string): Pokemon[] {
  return pokeList.filter(pokemon => pokemon?.name?.toLowerCase().startsWith(search.toLowerCase()));
}
