import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject = new BehaviorSubject<User>({});
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      // this.currentUserSubject.next(JSON.parse(userData));
    }
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(username: string, password: string): Observable<User> {
    // return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
    //   .pipe(map(user => {

    //     // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     localStorage.setItem('currentUser', JSON.stringify(user));
    //     this.currentUserSubject.next(user);
    //     return user;
    //   }));
    const defaultUser: User = {
      id: 12345,
      username: 'admin',
      password: 'password',
      firstName: 'John',
      lastName: 'Doe',
      token: 'dummytoken',
    };
    if (
      username === defaultUser.username &&
      password === defaultUser.password
    ) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(defaultUser));
      this.currentUserSubject.next(defaultUser);
      return of(defaultUser);
    } else {
      return throwError('LOGIN_PAGE.WRONG_CREDENTIALS');
    }
  }

  logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('currentUser');
    // this.currentUserSubject.next({});
  }
}
