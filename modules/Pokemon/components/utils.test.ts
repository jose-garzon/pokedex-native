import { bulbasaurMock } from '@/tests/mocks';
import { addEmptyItemsToList, getTypeColor, searchPokemon } from './utils';
import { Pokemon } from '../types';

describe('getTypeColor', () => {
  it('should return the values for a valid pokemon type', () => {
    const colors = getTypeColor('grass');
    expect(colors).toEqual({ background: '#78C850', color: 'black' });
  });
  it('should return the default values for an invalid pokemon type', () => {
    const colors = getTypeColor('invalid');
    expect(colors).toEqual({ background: '#A8A090', color: 'white' });
  });
});

describe('addEmptyItemsToList', () => {
  it('should add empty items to the list', () => {
    const pokeList: Pokemon[] = [
      {
        id: 1,
        name: 'Bulbasaur',
        experience: 644,
        weight: 69,
        height: 7,
        baseImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        artImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        stats: [],
        types: [],
      },
    ];
    const columnCount = 3;
    const result = addEmptyItemsToList(pokeList, columnCount);
    expect(result).toEqual([...pokeList, null, null]);
  });
});

describe('searchPokemon', () => {
  it('should return the list of pokemons filtered by name', () => {
    const pokeList: Pokemon[] = [
      {
        id: 1,
        name: 'Bulbasaur',
        experience: 644,
        weight: 69,
        height: 7,
        baseImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        artImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        stats: [],
        types: [],
      },
      {
        id: 1,
        name: 'Charmander',
        experience: 644,
        weight: 69,
        height: 7,
        baseImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        artImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        stats: [],
        types: [],
      },
    ];
    const search = 'bulbasaur';
    const result = searchPokemon(pokeList, search);
    expect(result).toEqual([pokeList[0]]);
  });
});
