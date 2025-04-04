import { render, screen } from '@testing-library/react-native';
import { PokemonList } from './PokemonList';

describe('PokemonList', () => {
  it.only('should render the pokemons list', async () => {
    render(<PokemonList />);
    const pokemonName = await screen.findByRole('image', { name: /bulbasaur/i });
    expect(pokemonName).toBeVisible();
  });
  it.todo('should show an error message if the list query fails');
});
