import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models";
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:5000/api'
  private userName = new BehaviorSubject<any>('');
  public tokenJwt = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
  }

  set username(user) {
    this.userName.next(user);
  }
  get username() {
    return this.userName.getValue();
  }
  set token(token) {
    console.log(token)
    this.tokenJwt.next(token);
  }
  get token() {
    return this.tokenJwt.getValue();
  }

  signUp(user: User) {
    return this.http.post<User>(`${this.URL}/signup`, user)
  }

  signIn(user: User) {
    return this.http.post<User>(`${this.URL}/signin`, user)
  }

  getToken() {
    const details = JSON.parse(localStorage.getItem('userDetails'));
    if (details) {
      this.userName.next(details.email.split('@')[0]);
      localStorage.setItem('token', details.token);
      // console.log(details)
    } else localStorage.clear();
  }

  getTokenJwt() {
    return this.tokenJwt.getValue();
  }

  loggedIn(): boolean {
    this.getToken();
    return !!localStorage.getItem('token');
  }

  logOut(): void {
    localStorage.clear();
  }
}
