import { PokeList, Pokemon } from '@/modules/Pokemon/types';

export const bulbasaurMock: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  artImage:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  baseImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  experience: 64,
  stats: [
    {
      name: 'hp',
      value: 45,
    },
    {
      name: 'attack',
      value: 49,
    },
    {
      name: 'defense',
      value: 49,
    },
    {
      name: 'special-attack',
      value: 65,
    },
    {
      name: 'special-defense',
      value: 65,
    },
    {
      name: 'speed',
      value: 45,
    },
  ],
  types: ['grass', 'poison'],
  weight: 69,
  height: 70,
};
export const charmanderMock: Pokemon = {
  id: 4,
  name: 'charmander',
  artImage:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
  baseImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  experience: 62,
  stats: [
    {
      name: 'hp',
      value: 39,
    },
    {
      name: 'attack',
      value: 52,
    },
    {
      name: 'defense',
      value: 43,
    },
    {
      name: 'special-attack',
      value: 60,
    },
    {
      name: 'special-defense',
      value: 50,
    },
    {
      name: 'speed',
      value: 65,
    },
  ],
  types: ['fire'],
  weight: 85,
  height: 60,
};
export const squirtleMock: Pokemon = {
  id: 7,
  name: 'squirtle',
  artImage:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
  baseImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
  experience: 63,
  stats: [
    {
      name: 'hp',
      value: 44,
    },
    {
      name: 'attack',
      value: 48,
    },
    {
      name: 'defense',
      value: 65,
    },
    {
      name: 'special-attack',
      value: 50,
    },
    {
      name: 'special-defense',
      value: 64,
    },
    {
      name: 'speed',
      value: 43,
    },
  ],
  types: ['water'],
  weight: 90,
  height: 50,
};

export const pokemonListMock: PokeList = {
  next: 3,
  results: [bulbasaurMock, charmanderMock, squirtleMock],
};
