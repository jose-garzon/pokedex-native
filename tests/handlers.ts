import { http, HttpResponse } from 'msw';
import { bulbasaurMock, charmanderMock, pokemonListMock } from './mocks';

const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

export const handlers = [
  http.get(baseUrl, () => {
    return HttpResponse.json(pokemonListMock);
  }),
  http.get(`${baseUrl}/${bulbasaurMock.name}`, () => {
    return HttpResponse.json(bulbasaurMock);
  }),
  http.get(`${baseUrl}/${charmanderMock.name}`, () => {
    return HttpResponse.json(charmanderMock);
  }),
];

export const errorHandlers = [
  http.get(baseUrl, () => {
    return HttpResponse.json({ message: 'Failed to fetch Pokemon list' }, { status: 500 });
  }),
  http.get(`${baseUrl}/${bulbasaurMock.name}`, () => {
    return HttpResponse.json({ message: 'not found' }, { status: 404 });
  }),
  http.get(`${baseUrl}/${charmanderMock.name}`, () => {
    return HttpResponse.json({ message: 'not found' }, { status: 404 });
  }),
];
