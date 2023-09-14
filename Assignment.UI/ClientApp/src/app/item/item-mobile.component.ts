import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { AlertService } from '../_services/alert.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ProductService } from '../_services/product.service';
import { CategoryService } from '../_services/category.service';
import { Product } from '../_models/product';
import { Category } from '../_models/category';
import { formatDate } from '@angular/common';
import { CartService } from '../_services/cart.service';
import { Cart } from '../_models/cart';


@Component({
  templateUrl: './item-mobile.component.html',
})
export class ItemMobileComponent implements OnInit {

  products?: Product[];
  user:any;
  productList:any=[];
  itemList:any=[];
  productCount:any;
  cart!:Cart;

  constructor( private alertService: AlertService, private route: ActivatedRoute, private router: Router, 
    private acc:AccountService, private productService:ProductService, private categoryService:CategoryService ,
    private cartService:CartService) { 
      this.user=this.acc.userValue;
    }

  ngOnInit(): void {
    this.productService.getAllProduct().subscribe((products) => {
      this.products = products.filter(x=>x.productCategory=='Mobile')
      console.log("qwerty", this.products.length)
      this.productCount = this.products.length;
      this.formattingList(this.products);
    });
      //this.formattingList();
    }
 
    formattingList(product:Product[]):any{
      console.log("enter inside")
      for (let i = 1; i <= this.productCount;) {
        this.itemList = [];
        var n = 0;
        if(i+2<=this.productCount)
        {
            n =3;
        }
        else{
          n = this.productCount - i +1;
        }
        for(let j=i; j<n+i; ++j){ 
            this.itemList.push(product[j-i]);   
        }
        i=3+i;
        console.log(this.itemList);
        this.productList.push(this.itemList);
      }
    }

    // incrementValue(id:number):any
    // {

    // }

    // decrementValue(id:number):any{
      
    // }

    cartAdd(product:Product):any{
      console.log(product.id);
      this.cartService.registerCart(product, this.user.userName)
        .subscribe({
          next: () => {
            this.alertService.success('Cart detail saved', { keepAfterRouteChange: true });
            this.router.navigateByUrl('/cart');
          },
          error: (error: any) => {
            this.alertService.error(error);
            //this.submitting = false;
          }
        })
    }
  
}
