import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit{
  
  //Passes information into component
  @Input() pokemons: Pokemon[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.pokemons)
  }





}
