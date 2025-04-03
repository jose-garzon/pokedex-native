export interface Sprites {
  back_default: string;
  front_default: string;
  front_shiny: string;
  other: {
    showdown: { front_default: string };
    home: { front_default: string };
    dream_world: { front_default: string };
    'official-artwork': { front_default: string };
  };
}
export interface PokemonResponse {
  id: number;
  base_experience: number;
  weight: number;
  height: number;
  is_default: boolean;
  location_area_encounters: string;
  name: string;
  order: number;
  past_abilities: any[];
  past_types: any[];
  sprites: Sprites;
  stats: { base_stat: number; effort: number; stat: { name: string; url: string } }[];
  types: { slot: number; type: { name: string; url: string } }[];
}

export interface Pokemon {
  id: number;
  name: string;
  experience: number;
  weight: number;
  height: number;
  baseImage: string;
  artImage: string;
  stats: { name: string; value: number }[];
  types: string[];
}

export interface PokeListResponse {
  count: number;
  next: string;
  previous: string;
  results: { name: string; url: string }[];
}

export interface PokeList {
  next: number | null;
  results: Pokemon[];
}
