import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/_models/cart';
import { TokenResponse, User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  user:any;
  cartList?:Cart[];
  userInfo?:User[];
  userValue?:User;
  counts:any[]=["Added","Purchased", "Shipped", "Dispatched"];

  constructor(  private alertService: AlertService, private route: ActivatedRoute, private router: Router, 
    private acc:AccountService, private cartService:CartService, private accountService:AccountService) {  
      this.user=this.acc.userValue;
      this.accountService.getAllUsers().subscribe((userInfo) => {
        this.userInfo = userInfo.filter(x=> x.username == this.user?.userName);
        this.getFirstValue(this.userInfo);
      });
  }

  ngOnInit(): void {
    this.cartService.getAllCart().subscribe((cartList) => {
      this.cartList = cartList.filter(x=>x.cartStatus!='Added' && x.userName ==this.user.userName)
    });
  }

  getFirstValue(userInfo:User[]):void {
      this.userValue = userInfo[0];
  }
    
}
