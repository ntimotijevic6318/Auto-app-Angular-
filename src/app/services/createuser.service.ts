import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CreateuserService {

  private readonly apiUrl = environment.postApi
  constructor(private httpClient : HttpClient) {
  }

  createUser(name: string, surname: string, username: string,   password : string,  ip : string) {
    return this.httpClient.post<any>(`${this.apiUrl}/api/users` , {name : name , surname : surname , email : username , password : password , ip : ip})
  }



}
