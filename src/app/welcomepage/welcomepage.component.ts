import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Advertisement, Country, Image, Info} from "../model";
import {Parser} from "@angular/compiler";
import {ActivatedRoute, Event} from "@angular/router";
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export  class FileUploadService {

  constructor(private http:HttpClient) { }

  // Returns an observable
  upload(file):Observable<any> {

    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file, file.name);

    // Make http post request over api
    // with formData as req
    return this.http.post('http://localhost:8080/check/upload', formData , {headers  : new HttpHeaders().set('Authorization' , `Bearer ${localStorage.getItem("jwt")}`) })

  }


}

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css']
})
export class WelcomepageComponent implements OnInit {

  constructor(private httpClient: HttpClient , public router : Router) {
  }

  public selectedFile;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  stanje: any;
  marka: any;
  model: any;
  godiste: any;
  kilometraza: any;
  karoserija: any;
  gorivo: any;
  kubikaza: any;
  snagamotora: any;
  fiksnacena: any;
  zamena: any;
  advertisement_name : string
  image : Image
  kontakttelefon: any;
  drzava: any;
  grad : any;
  public onFileChanged(event) {
    this.selectedFile = event.target.files[0]
    // Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }


  // This part is for uploading



  onUpload() {
    this.httpClient.put<Advertisement>('http://localhost:8080/check/upload/advertisement' , {name: this.advertisement_name, type : 'basic' , user_id : this.router.url.split('/').pop()} , {headers  : new HttpHeaders().set('Authorization' , `Bearer ${localStorage.getItem("jwt")}`) }).subscribe(
      response => {

        this.httpClient.post<Info>(`http://localhost:8080/check/upload/info?advertisement_id=${response.id}`, {stanje : this.stanje , marka : this.marka , model : this.model , godiste: this.godiste, kilometraza : this.kilometraza , karoserija: this.karoserija , gorivo : this.gorivo , kubikaza : this.kubikaza , snagamotora: this.snagamotora , fiksnacena: this.fiksnacena , zamena : this.zamena , kontakttelefon : this.kontakttelefon }, {headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("jwt")}`)}).subscribe(response => {
          console.log(response);
        })

        const uploadData = new FormData();
        uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
        console.log(uploadData);
        this.httpClient.post<Image>(`http://localhost:8080/check/upload?advertisement_id=${response.id}`, uploadData, {headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("jwt")}`)})
          .subscribe(
            response => {
              this.image = response;
              this.receivedImageData = response;
              this.base64Data = this.receivedImageData.pic;
              this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
            err => console.log('Error Occured duringng saving: ' + err)
            });

        })

  }

  ngOnInit(): void {

    document.getElementById("myForm").style.display = "block";

     this.httpClient.get<Country>("https://restcountries.com/v2/all").subscribe(
      res => {
        for (let i = 0; i < 250; i++) {
          var a = document.createElement('option')
          a.style.display = "block"
          a.style.padding = "12px 16px"
          a.style.textDecoration = "none"
          a.style.background = "#ddd"
          a.style.cursor = "pointer"
          a.innerText = `${res[i].name}`
          a.value = "1" + i;
          document.getElementById("myInput").append(a)
        }
      })


    this.httpClient.get(`https://restcountries.com/v2/all`).subscribe(
     res => {

         for (let i = 0; i < 250; i++) {
          var a = document.createElement('option')
          a.style.display = "block"
          a.style.padding = "12px 16px"
          a.style.textDecoration = "none"
          a.style.background = "#ddd"
          a.style.cursor = "pointer"
          a.innerText = `${res[i].capital}`
          document.getElementById("dd").append(a)
        }
     })
  }
}


