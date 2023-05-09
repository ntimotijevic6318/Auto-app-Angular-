import { Component, OnInit } from '@angular/core';
import {ShowusersComponent} from "../showusers/showusers.component";
import {EditUserService} from "../services/edit-user.service";
import {Image, User} from "../model";
import {ShowusersService} from "../services/showusers.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {


  user : User = {
    name: '',
    surname: '',
    email: '',
    password: '',
    permission: '',
    pictures : Array<Image>(),
    ip: ''
    }


  constructor(private updateUserService : EditUserService , private showUserService : ShowusersService , private route: ActivatedRoute) { }



  ngOnInit(): void {


    this.showUserService.getUsers().subscribe((users)=>{
      for(let i=0 ; i<users.length ; i++){
        if(this.route.snapshot.paramMap.get('email')  === users[i].email){
               this.user = users[i]
        }
      }
    })
  }


  updateUser(name: string, surname: any, email: any, password: any, cc: any, cr: any, cu: any, cd: any) {
    this.updateUserService.updateUser(name , surname ,  email ,  password ,cc , cr, cu , cd ).subscribe((user) => {
      this.user = user
    })
  }
}
