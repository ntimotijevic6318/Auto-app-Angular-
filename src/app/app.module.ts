import {CUSTOM_ELEMENTS_SCHEMA, Directive, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ShowusersComponent } from './showusers/showusers.component';
import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditUserComponent } from './edit-user/edit-user.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { ShowUserComponent } from './show-user/show-user.component';
import {NgImageSliderModule} from "ng-image-slider";
import { RepairComponent } from './repair/repair.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-





// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShowusersComponent,
    UsersComponent,
    CreateUserComponent,
    EditUserComponent,
    WelcomepageComponent,
    ShowUserComponent,
    RepairComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        NgImageSliderModule,
        ReactiveFormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent] ,

})
export class AppModule { }
