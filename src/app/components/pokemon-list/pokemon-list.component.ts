import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit{
  
  //Passes information into component
  @Input() pokemons: Pokemon[] = [];

  constructor(private pokemonCatalogueService: PokemonCatalogueService) { }

  ngOnInit(): void {

  }

  // Method to get the URL of the Pokemon's image
  getPokemonImageUrl(url: string): string {
    // Extract the Pokemon's ID from the URL
    const id = this.pokemonCatalogueService.extractID(url);
    // Return the URL of the Pokemon's image
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
  
}
