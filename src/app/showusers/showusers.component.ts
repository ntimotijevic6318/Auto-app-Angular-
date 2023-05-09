import {Component, Injectable, OnInit} from '@angular/core';
import {ShowusersService} from "../services/showusers.service";
import {Advertisement, Image, User} from "../model";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ShowimagesServices} from "../services/showimages.services";
import{ElementRef} from "@angular/core";




@Component({
  selector: 'app-showusers',
  templateUrl: './showusers.component.html',
  styleUrls: ['./showusers.component.css']
})
export class ShowusersComponent implements OnInit {

  advertisements : Advertisement[] = []
  public user: User;

  constructor(private showService: ShowusersService, private router: Router, private httpClient: HttpClient, private showImageService: ShowimagesServices, private el: ElementRef ) {
  }

  ngOnInit(): void {

    this.showService.getAdvertisements().subscribe(response => {
        this.advertisements = response;

        for (let i = 0; i < this.advertisements.length; i++) {
          this.showService.getImage(this.advertisements[i]).subscribe(response => {
           this.advertisements[i].mainPicture = response;
          })
        }
      }
    )
  }

  changeRoute(id : number) {
    this.router.navigate([`show-user/${id}`])
  }



}
