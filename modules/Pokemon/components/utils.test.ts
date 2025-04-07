import { getTypeColor } from './utils';

describe('getTypeColor', () => {
  it('should return the values for a valid pokemon type', () => {
    const colors = getTypeColor('grass');
    expect(colors).toEqual({ background: '#78C850', color: 'black' });
  });
  it('should return the default values for an invalid pokemon type', () => {
    const colors = getTypeColor('invalid');
    expect(colors).toEqual({ background: '#A8A090', color: 'white' });
  });
});
