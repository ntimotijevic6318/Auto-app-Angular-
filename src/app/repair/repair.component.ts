import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent implements OnInit {

  username: string;
  password : string;

  constructor(public loginService : LoginService , public router : Router) { }

  ngOnInit(): void {

  }

  checkIfExist() {
    this.loginService.repairPassword(this.username).subscribe((response)=>{
     if(response == true){
       document.getElementById("repair").classList.add('blur');
       document.getElementById("repairPass").style.visibility = "visible";
     }else if(response == false){
         document.getElementById("username").style.border = "2px solid red"
     }
   })
  }


  changePass() {
     this.loginService.changePass(this.username,  this.password).subscribe((response)=>{
       this.router.navigate([''])
     })
  }


}
