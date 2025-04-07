import { act, fireEvent, render, screen } from '@/tests/utils';
import { PokeListScreen } from './list.screen';
import { server } from '@/tests/server';
import { errorHandlers } from '@/tests/handlers';
describe('Pokemon list', () => {
  it('should save the pokemon as visited when the user clicks on it', async () => {
    render(<PokeListScreen />);
    const pokemonName = await screen.findByRole('image', { name: /bulbasaur/i });
    expect(pokemonName).toBeOnTheScreen();
    expect(pokemonName).not.toBeSelected();
    act(() => fireEvent(pokemonName, 'press'));
    const closeButton = await screen.findByRole('button');
    act(() => fireEvent(closeButton, 'press'));
    expect(pokemonName).toBeSelected();
  });
  it('should open the pokemon details', async () => {
    render(<PokeListScreen />);
    const pokemonName = await screen.findByRole('image', { name: /bulbasaur/i });
    expect(pokemonName).toBeOnTheScreen();
    act(() => fireEvent(pokemonName, 'press'));
    const pokemonCardHeader = await screen.findByRole('header', { name: /bulbasaur/i });
    const grassType = screen.getByText(/grass/i);
    const poisonType = screen.getByText(/poison/i);
    const height = screen.getByText(/height:.* cm/i);
    const weight = screen.getByText(/weight:.* kg/i);
    const stats = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
    expect(pokemonCardHeader).toBeOnTheScreen();
    expect(grassType).toBeOnTheScreen();
    expect(poisonType).toBeOnTheScreen();
    expect(height).toBeOnTheScreen();
    expect(weight).toBeOnTheScreen();
    stats.forEach(stat => {
      expect(screen.getByText(stat)).toBeOnTheScreen();
    });
    const statsProgressBars = screen.getAllByRole('progressbar');
    expect(statsProgressBars).toHaveLength(stats.length);
  });
  it('should search for a pokemon and show it instead of the list', async () => {
    render(<PokeListScreen />);
    const searchBar = screen.getByPlaceholderText(/Name or pokedex number.../i);
    act(() => fireEvent(searchBar, 'changeText', 'bulbasaur'));
    const pokemonHeader = await screen.findByRole('header', { name: /bulbasaur/i });
    expect(pokemonHeader).toBeOnTheScreen();
    const pokeList = screen.queryByRole('list');
    expect(pokeList).not.toBeOnTheScreen();
  });
  it('should show an error message if the pokemon is not found', async () => {
    server.use(...errorHandlers);
    render(<PokeListScreen />);
    const searchBar = screen.getByPlaceholderText(/Name or pokedex number.../i);
    act(() => fireEvent(searchBar, 'changeText', 'bulbasaur'));
    const errorMessage = await screen.findByText(/Pokemon not found/i);
    expect(errorMessage).toBeOnTheScreen();
  });
});
