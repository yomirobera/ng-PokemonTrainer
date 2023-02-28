import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pokemon, PokeResults } from '../models/pokemon.model';
import { finalize, tap} from 'rxjs';

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

  public extractID(url: string): number {
    const urlArray = url.split('/');
    return +urlArray[urlArray.length - 2];
  }


  constructor(
    private readonly http: HttpClient) { }



  public findAllPokemons(): void {
    this._loading = true;
    this.http.get<PokeResults>(`${apiPokemons}?limit=151`)
    .pipe(
      tap(result=>console.log(result.results)),
      tap(result=>console.log(result.results)),
      finalize(() => {
          this._loading = false;
      })
    )
      .subscribe({
        next: (pokemons: PokeResults) => {
          this._pokemons = pokemons.results;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }
}
