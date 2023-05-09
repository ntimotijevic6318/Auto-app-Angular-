import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {  tap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  userIP : any;

  constructor(private httpClient: HttpClient) {
  }


  login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${environment.postApi}/auth/login`, {
      username: username,
      password: password
    }).pipe(
      catchError(err => this.catchAuthError(err))
    )
  }


  repairPassword(username: string) {
    return this.httpClient.get<any>(`${environment.postApi}/api/users/${username}`, {headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("jwt")}`)})
  }

  changePass(username: string, password: string) {
    return this.httpClient.put(`${environment.postApi}/api/users/pass`, {
      email: username,
      password: password
    }, {headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("jwt")}`)})
  }

  private catchAuthError(err: any): Observable<Response> {
    if (err && err.err && err.err.message) {
      alert(err.err.message)
    } else if (err && err.message) {
      document.getElementById("badCredentials").innerText = "Uneli ste pogresne kredencijale"
      document.getElementById("btn").classList.remove('blur')
    }

    return throwError(err);
  }


}

