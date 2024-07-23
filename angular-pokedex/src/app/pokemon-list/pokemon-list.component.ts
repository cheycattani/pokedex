import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService, Pokemon } from '../services/pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonCardComponent, CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[] = [];
  paginatedPokemons: Pokemon[] = [];
  pageSize: number = 10;
  currentPage: number = 0;

  constructor(public pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadPokemons();
  }

  async loadPokemons() {
    await this.pokemonService.carregarPokemons();
    this.pokemons = this.pokemonService.pokemons;
    this.atualizaPaginaPokemons();
  }

  atualizaPaginaPokemons() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPokemons = this.pokemons.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.atualizaPaginaPokemons();
  }

  get totalPages(): number {
    return Math.ceil(this.pokemons.length / this.pageSize);
  }
}
