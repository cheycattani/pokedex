import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pokemon } from '../services/pokemon.service';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
  @Input() numero!: number;

  pegarImagemPokemon(): string {
    const numeroFormatado = this.leadingZero(this.numero);
    return `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${numeroFormatado}.png`;
  }

  leadingZero(str: string | number, size = 3): string {
    let s = String(str);
    while (s.length < (size || 2)) {
      s = '0' + s;
    }
    return s;
  }
}
