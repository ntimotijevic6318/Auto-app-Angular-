export interface User {
  email  : string
  name : string
  password : string
  permission : any
  surname : string
  pictures : Image[];
  ip : any;
}

export class Image {
   id : any
   name: any
   pic  : any
   type  : any
   username : string
   lastTouched : string
   dateFormated : Date
}

export interface  Advertisement {
  id : number
  name : string
  type : string
  user_id : number
  mainPicture : Image
  allPictures : Image[]
  info : Info
}

export interface SliderImg {
  image : any;
  thumbImage  : any
  title : any
}

export interface Country{
  name  : string
  maps : any
}

export interface Info{
  stanje: string;
  marka : string;
  model : string;
  godiste : string
  kilometraza: string
  karoserija : string
  gorivo : string
  kubikaza : string
  snagamotora: string
  fiksnacena : string
  zamena : string
  advertisement_id : number
  kontakttelefon : string;
  drzava  : string;
  grad : string;
}

export class SlideImg1{
  image : any;
}






