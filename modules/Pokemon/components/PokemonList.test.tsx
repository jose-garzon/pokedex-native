import { render, screen } from '@/tests/utils';
import { PokemonList } from './PokemonList';
import { pokemonListMock } from '@/tests/mocks';
import { useGetPokemonList } from '../adapters';

const getNextPageMock = jest.fn();
const useGetPokemonListMock = jest.mocked(useGetPokemonList);

describe('PokemonList', () => {
  it.only('should render the pokemons list', async () => {
    expect(true).toBeTruthy();
    useGetPokemonListMock.mockReturnValue({ ...pokemonListMock, getNextPage: getNextPageMock });
    render(<PokemonList />);
    const pokemonName = await screen.findByRole('image', { name: /bulbasaur/i });
    expect(pokemonName).toBeVisible();
  });
  it.todo('should show an error message if the list query fails');
});
