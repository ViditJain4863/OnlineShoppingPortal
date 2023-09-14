import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { CartService } from '../_services/cart.service';
import { Cart } from '../_models/cart';
import { AlertService } from '../_services/alert.service';


@Component({
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit {
  users?:User[];
  user:any;
  cartList?:Cart[];
  cartListDisplay?:Cart[];
  submitting = false;
  userNm ='';
  categoryNm ='';
  statusNm = '';
  constructor( private route: ActivatedRoute, private router: Router, private alertService:AlertService,
    private acc:AccountService,private cartService:CartService) { 
      this.user=this.acc.userValue;
      
    }

  ngOnInit(): void 
  {
    //Fetching the cart list and displaying the list which are placed, shipped, dispatched
    this.cartService.getAllCart().subscribe((cartList) => {
      this.cartList = cartList.filter(x=>x.cartStatus!="Added");
      this.cartListDisplay = this.cartList;
    }); 
    console.log(this.userNm);
  }

  //Calling it when sending the product for shipment or marking it delievered, so that the status can be updated.
  changeStatus(cartDetail:Cart){
    this.submitting = true;
    console.log("Status is ", cartDetail);
    this.cartService.updateCart(cartDetail).subscribe({
      next: () => {
          this.alertService.success('Cart Detail Updated', { keepAfterRouteChange: true });
          this.router.navigateByUrl('/admin/pList');
      },
      error: (error: any) => {
          this.alertService.error(error);
          this.submitting = false;
      }
    });
  }

  //Clearing the filters and assigning back the orginnal list shown
  onClearFilters():void {
    this.userNm= "";
    this.categoryNm = "";
    this.statusNm = "";
    this.cartListDisplay = this.cartList;
  }
  
  //Filtering the list based on the username, status, category and updating the list  , so that it can be visibe to the admin
  onfilter():void {
    this.cartListDisplay = this.cartList;
    console.log(this.userNm);
    if(this.userNm != ""){
      console.log("Inside if");
      this.cartListDisplay =  this.cartListDisplay?.filter(x=>x.userName?.includes(this.userNm) );;
    }
    if(this.statusNm != ""){
      this.cartListDisplay =  this.cartListDisplay?.filter(x=>x.cartStatus?.includes(this.statusNm));;
    }
    if(this.categoryNm != ""){
      this.cartListDisplay = this.cartListDisplay?.filter(x=>x.productCategory?.includes(this.categoryNm));
    }
  }
  
}
