import { http, HttpResponse } from 'msw';
import { bulbasaurMock, pokemonListMock } from './mocks';

const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

export const handlers = [
  http.get(baseUrl, () => {
    return HttpResponse.json(pokemonListMock);
  }),
  http.get(`${baseUrl}/${bulbasaurMock.name}`, () => {
    return HttpResponse.json(bulbasaurMock);
  }),
];

export const errorHandlers = [
  http.get(baseUrl, () => {
    return HttpResponse.json({ message: 'Failed to fetch Pokemon list' }, { status: 500 });
  }),
];
