import {
  act,
  fireEvent,
  render,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from '@/tests/utils';
import { PokeListScreen } from './list.screen';
import { server } from '@/tests/server';
import { errorHandlers } from '@/tests/handlers';
describe('Pokemon list', () => {
  it('should save the pokemon as visited when the user clicks on it', async () => {
    const user = userEvent.setup();
    render(<PokeListScreen />);
    const pokemonName = await screen.findByRole('image', { name: /bulbasaur/i });
    expect(pokemonName).toBeOnTheScreen();
    expect(pokemonName).not.toBeSelected();
    await user.press(pokemonName);
    const closeButton = await screen.findByRole('button', { name: /close/i });
    await user.press(closeButton);
    expect(pokemonName).toBeSelected();
  });
  it('should open the pokemon details', async () => {
    const user = userEvent.setup();
    render(<PokeListScreen />);
    const pokemonName = await screen.findByRole('image', { name: /bulbasaur/i });
    expect(pokemonName).toBeOnTheScreen();
    await user.press(pokemonName);
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
    const user = userEvent.setup();
    render(<PokeListScreen />);
    const searchBar = screen.getByPlaceholderText(/pokemon's name.../i);
    await user.type(searchBar, 'bulbasaur');
    const bulbasaurCard = await screen.findByRole('image', { name: /bulbasaur/i });
    const charmanderCard = screen.queryByRole('image', { name: /charmander/i });
    expect(bulbasaurCard).toBeOnTheScreen();
    expect(charmanderCard).not.toBeOnTheScreen();
  });
  it('should show the empty message if there is an invalid search', async () => {
    const user = userEvent.setup();
    render(<PokeListScreen />);
    const searchBar = screen.getByPlaceholderText(/pokemon's name.../i);
    await user.type(searchBar, 'not found');
    const emptyMessage = await screen.findByText(/no pokemons found/i, {}, { timeout: 2000 });
    expect(emptyMessage).toBeOnTheScreen();
  });
});
