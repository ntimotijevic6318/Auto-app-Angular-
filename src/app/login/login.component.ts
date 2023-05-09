import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from '@angular/router'
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  userEmails = new FormGroup({
    username : new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]) ,
      password : new FormControl('' , [])
  })


  constructor(private loginService: LoginService, private router: Router)  {
  }

  ngOnInit(): void {

   document.addEventListener("keyup", function(event) {
     //Key code for enter is 13
     if (event.keyCode === 13) {
        document.getElementById('btn').click();
     }
   });
  }


  login() {

     document.getElementById("badCredentials").innerText = "";

     if(this.primEmail.invalid) return;

     document.getElementById("btn").classList.add('blur');

     this.loginService.login(this.primEmail.value, this.pass.value).subscribe((jwt) => {
        localStorage.setItem("jwt", jwt.jwt)
        let jsonPayload  = this.parseJwt(jwt.jwt);
        this.router.navigate([`welcome-page/${jsonPayload.sub}`])

    })
  }

  public parseJwt(jwt : any): String{
    var base64Url = jwt.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }


  openRepairForm() : void {
    this.router.navigate(['/repair'])
  }

  get primEmail(){
    return this.userEmails.get('username')
  }

  get pass(){
    return this.userEmails.get('password')
  }

}

