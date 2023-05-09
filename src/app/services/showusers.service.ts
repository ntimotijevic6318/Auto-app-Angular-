import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Advertisement, Image, Info, User} from "../model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShowusersService {

  private readonly apiUrl = environment.postApi


  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/api/users/all`)
  }

  getAdvertisements(): Observable<Advertisement[]> {
    return this.httpClient.get<Advertisement[]>(`${this.apiUrl}/check/get/full`);
  }

  getImage(advertisement: Advertisement): Observable<Image> {
    return this.httpClient.get<Image>(`${this.apiUrl}/check/get/mainImage?advertisement_id=${advertisement.id}`)
  }

  getAdvertisement(id: string): Observable<Advertisement> {
    return this.httpClient.get<Advertisement>(`http://localhost:8080/check/getAdvertisement?advertisement_id=${id}`)
  }

  getImages(advertisement: Advertisement) : Observable<Image[]> {
    return this.httpClient.get<Image[]>(`http://localhost:8080/check/getAdvertisementImages?advertisement_id=${advertisement.id}`)
  }

  getInfo(id: string) : Observable<Info> {
    return this.httpClient.get<Info>(`http://localhost:8080/check/getInfoForAdvertisement?advertisement_id=${id}`)
  }
}

