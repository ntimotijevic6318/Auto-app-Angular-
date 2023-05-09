import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ShowusersComponent} from "./showusers/showusers.component";
import {CreateUserComponent} from "./create-user/create-user.component";
import {PermGuard} from "./perm.guard";
import {WelcomepageComponent} from "./welcomepage/welcomepage.component";
import {ShowUserComponent} from "./show-user/show-user.component";
import {RepairComponent} from "./repair/repair.component";

const routes: Routes = [
  {
    path : '',
    component : LoginComponent
  } ,
  {
   path : 'users' ,
   component : ShowusersComponent
  },
  {
    path : 'users-create' ,
    component : CreateUserComponent ,
    canActivate  : [PermGuard]
  },
  {
    path : 'welcome-page/:email',
    component : WelcomepageComponent
  },
  {
    path : 'show-user/:id' ,
    component : ShowUserComponent
  },
  {
    path : 'repair',
    component : RepairComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
