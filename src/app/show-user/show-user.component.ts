import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Advertisement, Image, Info, SlideImg1, SliderImg, User} from "../model";
import {ShowusersService} from "../services/showusers.service";
import {Router} from "@angular/router";
import {NgImageSliderComponent} from "ng-image-slider";
import {HostListener , ElementRef} from '@angular/core';


@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
 export  class ShowUserComponent implements OnInit {


  constructor(private showService: ShowusersService, public router: Router, private el: ElementRef) {

  }

  public users: User[] = []
  public user: User;
  public imageObject: Array<SliderImg> = [];
  public advertisement : Advertisement;
  info : Info;


  ngOnInit(): void {

    this.showService.getAdvertisement(this.router.url.split('/').pop()).subscribe(response => {
      this.advertisement = response;
      this.showService.getImage(this.advertisement).subscribe(response => {
        this.advertisement.mainPicture = response;
      })

      this.showService.getImages(this.advertisement).subscribe(response => {
        this.advertisement.allPictures = response;
        console.log(this.advertisement.id)
        for (let i = 0; i < this.advertisement.allPictures.length; i++) {
          this.imageObject.push({
            image: 'data:image/jpeg;base64,' + this.advertisement.allPictures[i].pic,
            thumbImage: 'data:image/jpeg;base64,' + this.advertisement.allPictures[i].pic,
            title: this.advertisement.allPictures[i].name
          })
        }
      })

      this.showService.getInfo(this.router.url.split('/').pop()).subscribe( response => {
       this.info= response;
      })
    })





  }


}

