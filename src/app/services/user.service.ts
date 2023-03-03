import { Injectable } from '@angular/core';
import { storagekeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //To keep track the currently logged in user
  private _user?: User;

  get user(): User | undefined {
    return this._user;
  }

  set user(user: User | undefined) {
    StorageUtil.storageSave<User>(storagekeys.User, user!);
    this._user=user;
  }

  constructor() { 
    this._user = StorageUtil.storageRead<User>(storagekeys.User);
  }

  public inFavourites(pokemonId: string) : boolean {
    if (this._user) {
      return Boolean(this._user?.pokemon.find((pokemon: Pokemon) => pokemon.name === pokemonId));
    }

    return false
  }
  //collect pokemons
  public addToCaught(pokemon: Pokemon): void {
    if (this._user) {
      this._user.pokemon.push(pokemon);
    }
  }
  
  //Remove caught pokemons
  public removeFromCaught(name: string): void {
    if (this._user) {
      this._user.pokemon = this._user.pokemon.filter((pokemon: Pokemon) => pokemon.name !==name)
    }
  }
  //Logout user
  public logOut(): void {
    sessionStorage.clear();
    this.user=undefined;
  }
}
