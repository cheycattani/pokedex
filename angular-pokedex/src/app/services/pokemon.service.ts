import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Pokemon {
  name: string;
  abilities: string[];
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemons: Pokemon[] = [];
  url = 'https://pokeapi.co/api/v2/pokemon?limit=151';

  constructor(private httpClient: HttpClient) {
    this.carregarPokemons();
  }

  async carregarPokemons() {
    try {
      const requisicao = await this.httpClient.get<any>(this.url).toPromise();
      const pokemonDetails = await Promise.all(requisicao.results.map(async (pokemon: any) => {
        const details = await this.httpClient.get<any>(pokemon.url).toPromise();
        const speciesDetails = await this.httpClient.get<any>(details.species.url).toPromise();
        const category = speciesDetails.genera.find((genus: any) => genus.language.name === 'en')?.genus || 'No category available';
        const abilities = details.abilities.map((ability: any) => ability.ability.name);
        return {
          name: pokemon.name,
          abilities: abilities,
          category: category
        };
      }));
      this.pokemons = pokemonDetails;
      console.log(this.pokemons);
    } catch (error) {
      console.error('Erro ao carregar Pokémons', error);
    }
  }
}
