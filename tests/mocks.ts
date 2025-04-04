export const pokemonListMock = {
  data: [
    {
      id: 1,
      name: 'bulbasaur',
      baseImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
    {
      id: 2,
      name: 'charmander',
      baseImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
    },
    {
      id: 3,
      name: 'squirtle',
      baseImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
    },
  ],
  isLoading: false,
  error: null,
};

export const pokemonListErrorMock = {
  data: undefined,
  isLoading: false,
  error: { message: 'Not found' },
};

export const pokemonMock = {
  id: 1,
  name: 'bulbasaur',
  baseImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  artImage: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  experience: 64,
  stats: [
    { name: 'hp', value: 45 },
    { name: 'attack', value: 49 },
    { name: 'defense', value: 49 },
    { name: 'special-attack', value: 65 },
    { name: 'special-defense', value: 50 },
    { name: 'speed', value: 45 },
  ],
  types: ['grass', 'poison'],
  weight: 69,
  height: 70,
};
