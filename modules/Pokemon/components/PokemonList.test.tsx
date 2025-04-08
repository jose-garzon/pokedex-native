import { render, screen, waitFor, waitForElementToBeRemoved } from '@/tests/utils';
import { PokemonList } from './PokemonList';
import { server } from '@/tests/server';
import { errorHandlers } from '@/tests/handlers';

describe('PokemonList', () => {
  it('should render the pokemons list', async () => {
    render(<PokemonList search="" />);
    const pokemonName = await screen.findByRole('image', { name: /bulbasaur/i });
    expect(pokemonName).toBeOnTheScreen();
  });
  it('should show an error message if the list query fails', async () => {
    server.use(...errorHandlers);
    render(<PokemonList search="" />);
    const errorMessage = await screen.findByText(/Something went wrong/i);
    expect(errorMessage).toBeOnTheScreen();
  });
});
