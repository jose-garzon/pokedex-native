export function getTypeColor(type: string): { background: string; color: string } {
  switch (type) {
    case 'normal':
      return { background: '#A8A090', color: 'white' };
    case 'fighting':
      return { background: '#A05038', color: 'white' };
    case 'flying':
      return { background: '#98A8F0', color: 'black' };
    case 'poison':
      return { background: '#B058A0', color: 'white' };
    case 'ground':
      return { background: '#E9D6A4', color: 'black' };
    case 'rock':
      return { background: '#B8A058', color: 'white' };
    case 'bug':
      return { background: '#A8B820', color: 'black' };
    case 'ghost':
      return { background: '#6060B0', color: 'white' };
    case 'steel':
      return { background: '#A8A8C0', color: 'black' };
    case 'fire':
      return { background: '#F05030', color: 'white' };
    case 'water':
      return { background: '#3899F8', color: 'black' };
    case 'grass':
      return { background: '#78C850', color: 'black' };
    case 'electric':
      return { background: '#F8D030', color: 'black' };
    case 'psychic':
      return { background: '#F870A0', color: 'black' };
    case 'ice':
      return { background: '#58C8E0', color: 'white' };
    case 'dragon':
      return { background: '#7860E0', color: 'white' };
    case 'dark':
      return { background: '#7A5848', color: 'white' };
    case 'fairy':
      return { background: '#E79FE7', color: 'white' };
    default:
      return { background: '#A8A090', color: 'white' };
  }
}
