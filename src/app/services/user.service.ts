import { Injectable } from '@angular/core';
import { storagekeys } from '../enums/storage-keys.enum';
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
}
