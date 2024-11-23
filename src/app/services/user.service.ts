import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/Response';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  UrlApi = environment.UrlApi;
  constructor(private httpClient : HttpClient) { }

  GetUsers() : Observable<Response<User[]>> {
    return this.httpClient.get<Response<User[]>>(`${environment.UrlApi}/users`);
  }

  GetUserById(userId: number) : Observable<Response<User>> {
    return this.httpClient.get<Response<User>>(`${environment.UrlApi}/users/${userId}`);
  }

  CreateUser(user: User): Observable<Response<User>> {
    return this.httpClient.post<Response<User>>(`${environment.UrlApi}/users`, user);
  }

  DeleteUser(userId: number) : Observable<Response<User>> {
    return this.httpClient.delete<Response<User>>(`${environment.UrlApi}/users/${userId}`);
  }
}
