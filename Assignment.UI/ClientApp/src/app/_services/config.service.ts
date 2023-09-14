import { Injectable } from '@angular/core';
import {banner, logo, title , signUpLogo , cartLogo , profileLogo , categoryLogo , productLogo} from "../_models/images";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  getLogo(){
    return logo;
  }

  getBanner(){
    return banner;
  }

  getTitle(){
    return title;
  }

  getSignUpLogo(){
    return signUpLogo;
  }

  getCartLogo(){
    return cartLogo;
  }

  getProfileLogo(){
    return profileLogo;
  }

  getCategoryLogo(){
    return categoryLogo;
  }

  getProductLogo(){
    return productLogo;
  }
  
}
