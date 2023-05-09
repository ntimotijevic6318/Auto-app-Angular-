import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(public router : Router , public loginService : LoginService) {
  }

  email : string ;


  ngOnInit() {

  }

 myFunction() {

   var x = document.getElementById("demo");
   if (x.className.indexOf("w3-show") == -1) {
     x.className += " w3-show";
    } else {
     x.className = x.className.replace(" w3-show", "");
    }
  }

  signout() {
    if(localStorage.getItem("jwt") != '') {
      localStorage.removeItem("jwt");
      this.router.navigate(['']);
      document.getElementById("welcome").innerText = "Guest";
      document.getElementsByClassName("welcome").item(0).classList.add("display")
    }
  }

  userLogedIn() : boolean {
    if(localStorage.getItem("jwt") == ''){
      return false;
    }else{
       return true;
    }


  }
}
