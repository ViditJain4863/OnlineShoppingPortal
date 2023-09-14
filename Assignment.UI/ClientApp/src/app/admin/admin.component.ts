import { Component, OnInit } from '@angular/core';
import { AlertService } from '../_services/alert.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ProductService } from '../_services/product.service';
import { CategoryService } from '../_services/category.service';
import { Product } from '../_models/product';
import { Category } from '../_models/category';
import { formatDate } from '@angular/common';
import { User } from '../_models/user';
import { CartService } from '../_services/cart.service';
import { Cart } from '../_models/cart';


@Component({
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  products?: Product[];
  productsList?:Product[];
  categories?: Category[];
  categoriesList?: Category[];
  users?:User[];
  user:any;
  todayDate:any;
  productCount:any;
  categoriesCount:any;
  usersCount:any;
  maleCount:any;
  femaleCount:any;
  ordersAdded:any;
  ordersPlaced:any;
  ordersShipped:any;
  ordersDelievered:any;
  cartList?:Cart[];

  constructor( private alertService: AlertService, private route: ActivatedRoute, private router: Router, 
    private acc:AccountService, private productService:ProductService, private categoryService:CategoryService , 
    private cartService:CartService) { 
      this.user=this.acc.userValue;
  }

  ngOnInit(): void 
  {
    this.todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    console.log(this.todayDate);
      
    //Fetching product list , its count , also filtering it based on today's date
    this.productService.getAllProduct().subscribe((products) => {
      this.products = products;
      this.productCount = this.products.length;
      this.productsList = products.filter(x=>x.productAddedOn == this.todayDate);
    });
    //Fetching categories list , its count , also filtering it based on today's date
    this.categoryService.getAllCategory().subscribe((categories) => {
      this.categories = categories;
      this.categoriesCount = this.categories.length;
      this.categoriesList = categories.filter(x=>x.categoryAddedOn == this.todayDate);
    });
    //Fetching the users list,  counting the numbers of users, male count , female count
    this.acc.getAllUsers().subscribe((users) => {
      this.users = users.filter(x=>x.role=='User')
      this.usersCount = this.users.length;
      this.maleCount = this.users.filter(x=>x.gender=='Male').length;
      this.femaleCount = this.users.filter(x=>x.gender=='Female').length;
    });

    //Fetching the cart list,  counting the numbers of orders placed, shipped, dispatched, added
    this.cartService.getAllCart().subscribe((cartList) => {
      this.cartList = cartList.filter(x=>x.cartStatus=='Added')
      this.ordersAdded = this.cartList.length;
      this.ordersPlaced = cartList.filter(x=>x.cartStatus=='Purchased').length;
      this.ordersShipped = cartList.filter(x=>x.cartStatus=='Shipped').length;
      this.ordersDelievered = cartList.filter(x=>x.cartStatus=='Dispatched').length;
    });
  } 
}
