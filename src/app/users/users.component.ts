import { Component, OnInit } from '@angular/core';
import {CreateuserService} from "../services/createuser.service";
import {User} from "../model";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  ngOnInit(): void {
  }

}
