import { Component, OnInit } from '@angular/core';
import {Image, User} from "../model";
import {CreateuserService} from "../services/createuser.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import * as emailjs from "emailjs-com";




@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.less']
})
export class CreateUserComponent implements OnInit {


  message: string = '';

  //User information
  username : any
  password: any;
  name : any;
  surname : any;
  ip : string;

  //Unique code for verification
  val: any;

  numbers_keyCode = [48 , 49 , 50 , 51 , 52 , 53 , 54 , 55 , 56 , 57]


  //user class instance
  user: User = {
    name: '',
    surname: '',
    email: '',
    password: '',
    permission: '',
    pictures: Array<Image>(),
    ip: ''
  }

  //inputs for verification
  input1: any;
  input2: any;
  input3: any;
  input4: any;

  //validation
  controlField : any = new FormGroup({
    name : new FormControl('' , []) ,
    surname : new FormControl('' , []),
    username : new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password : new FormControl('' , [
      Validators.required ,
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z]).{8,}$"),
    ])
  })

  inputs = document.getElementsByClassName("verify_input");

  constructor(private createUserService: CreateuserService , public router : Router , public httpClient : HttpClient) {
  }

  ngOnInit(): void {
    document.addEventListener("keyup", function(event) {
      //Key code for enter is 13
      if (event.keyCode === 13) {
        document.getElementById('btn').click();
      }
    });

    (function(){
      emailjs.init("L4GJguMIsNbbOqYxO"); //use your USER ID
    })();
  }

  createUser() {
    if(this.u.invalid) return;
    this.val = Math.floor(1000 + Math.random() * 9000);
    this.sendEmail();
  }

  sendEmail() {

    var templateParams = {
      name: 'James',
      notes: 'Procitaj poruku u najkrece mogucem periodu!',
      to_email: this.u.value,
      message: `Dobrodošli ${this.n.value} ${this.s.value} vas verifikacioni kod je:`,
      message1 : this.val,
    };


    emailjs.send('service_ek8x0xb', 'template_j0p61qr', templateParams, "L4GJguMIsNbbOqYxO") //use your Service ID and Template ID
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        document.getElementById("verification").classList.remove("verification");
        document.getElementById("registration").classList.add("blur")
        this.verify()
      }, function (error) {
        console.log('FAILED...', error);
      });

  }

  verify() {
    if (this.val == this.input1 + this.input2 + this.input3 + this.input4) {
      this.httpClient.get('https://jsonip.com').subscribe(
        (value: any) => {
          this.ip = value.ip;
          console.log(this.ip);
          this.createUserService.createUser(this.n.value, this.s.value, this.u.value, this.pa.value, this.ip).subscribe((user) => {
            this.user = user
            this.router.navigate([''])
          })
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  addFocusToInput2(event: KeyboardEvent) {
    if(this.numbers_keyCode.includes(event.keyCode)) {
      document.getElementById("input2").focus();
    }else{
      this.input1 = "";
    }
  }

  addFocusToInput4(event: KeyboardEvent) {
    if(this.numbers_keyCode.includes(event.keyCode)) {
      document.getElementById("input4").focus()
    }
    else{
     this.input3 = "";
    }

  }

  addFocusToInput3(event: KeyboardEvent) {
    if(this.numbers_keyCode.includes(event.keyCode)) {
      document.getElementById("input3").focus();
    }else{
      this.input2 = "";
    }
  }

  closeForm() {
   document.getElementById("verification").classList.add('close1')
  }


  get n(){
    return this.controlField.get("name");
  }

  get s(){
    return this.controlField.get("surname")
  }

  get u(){
    return this.controlField.get("username")
  }

  get pa(){
    return this.controlField.get("password")
  }

}
