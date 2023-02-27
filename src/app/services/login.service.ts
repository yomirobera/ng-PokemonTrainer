import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const { apiUsers, apiKey } = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //Dependency  Injection.
  constructor(private readonly http: HttpClient) { }

  //Models, Observables, and RxJS operators.
  public login(username: string): Observable<User> {
    return this.checkUsername(username)
      .pipe(
        switchMap((user: User | undefined) => {
          if (user === undefined) { //User does not exist
            return this.createUser(username);
          }
          return of(user);
        })
      )
  }

  //Login
  //Check if user exists
  private checkUsername(username: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${apiUsers}?username=${username}`)
    .pipe(
      //RxJS Operators
      map((response: User[]) => response.pop())
    )
  }

  //Create a user
  private createUser(username: string): Observable<User>{
    //User
    const user = {
      username,
      pokemon: []
    };
    //Headers -> API Key
    const headers = new HttpHeaders({
      "content-Type": "application/json",
      "x-api-key": apiKey
    });
    //POST - create itesm on the server
    return this.http.post<User>(apiUsers, user, {headers})
  }
}
