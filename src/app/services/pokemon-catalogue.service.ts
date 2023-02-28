import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pokemon, PokeResult } from '../models/pokemon.model';
import { finalize, tap } from 'rxjs';

const { apiPokemons } = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemons: Pokemon[] = [];
  private _error: string ="";
  private _loading: boolean = false;


  get pokemons(): Pokemon[] {
    return this._pokemons;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }


  constructor(private readonly http: HttpClient) { }

  public findAllPokemons(): void {
    this._loading = true;
    this.http.get<PokeResult>(apiPokemons)
    .pipe(
      tap(result=>console.log(result.results)),
      finalize(() => {
          this._loading = false;
      })
    )
      .subscribe({
        next: (pokemons: PokeResult) => {
          this._pokemons = pokemons.results;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }
}
