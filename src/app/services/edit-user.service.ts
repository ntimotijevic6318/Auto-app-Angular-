import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../model";

@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  private readonly apiUrl = environment.postApi

  constructor(private httpClient : HttpClient) { }

   updateUser(name : string, surname : string , email : string ,   password: any, cc: any, cr: any, cu: any, cd: any) {

   return this.httpClient.put<any>(`${this.apiUrl}/api/users`, {name :name , surname : surname,  email : email , password : password , permission : {can_create_user  : cc , can_read_user : cr , can_update_user : cu ,  can_delete_user  : cd}  } , {headers  : new HttpHeaders().set('Authorization' , `Bearer ${localStorage.getItem("jwt")}`) })


   }
}
