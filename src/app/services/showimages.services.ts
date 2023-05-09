import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Image} from "../model";




@Injectable({
  providedIn: 'root'
})
export class ShowimagesServices {

  constructor(private httpClient : HttpClient) { }

  getCustomerImages(): Observable<Image[]> {
     return  this.httpClient.get<Image[]>('http://localhost:8080/check/all');
  }

}
