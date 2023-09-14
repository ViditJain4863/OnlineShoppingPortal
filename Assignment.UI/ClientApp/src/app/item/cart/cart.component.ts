import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/_models/cart';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  submitting = false;
  user:any;
  cartList?:Cart[];
  totalPrice:any;
  
  constructor(  private alertService: AlertService, private route: ActivatedRoute, private router: Router, 
    private acc:AccountService, private cartService:CartService) 
    {  
      this.user=this.acc.userValue;
    }

  ngOnInit(): void {
      this.GetAllCartList();
  }

  //Calulating the total amount of the cart list
  calculateTotal(cartLength:number , listCart:Cart[]):void{
    this.totalPrice = 0;
    for (let i = 0 ; i < cartLength;++i) {
        this.totalPrice = this.totalPrice + listCart[i].productPrice;
    }
  }
  
  //Calling it when placing the order for the product, so that the status can be updated.
  singlePlaceOrder(cartDetail:Cart):any{
    this.submitting = true;
    console.log("Status is ", cartDetail);
    this.cartService.updateCart(cartDetail).subscribe({
      next: () => {
          this.alertService.success('Congrats!! you have successfully placed order', { keepAfterRouteChange: true });
          this.router.navigateByUrl('/order');
      },
      error: (error: any) => {
          this.alertService.error(error);
          this.submitting = false;
      }
    });
  }
  
  //Calling it so that we can remove the product from the cart.
  delete(id: number) {  
    var ans = confirm("Do you want to remove product with Id: " + id + " from the cart");  
    if (ans) {  
        this.cartService.delete(id).subscribe((data) => {  
            this.GetAllCartList();
        }, error => console.error(error))  
    }  
  } 

  
  GetAllCartList():void {
    this.cartService.getAllCart().subscribe((cartList) => {
      this.cartList = cartList.filter(x=>x.cartStatus=='Added' && x.userName ==this.user.userName)
      this.calculateTotal(this.cartList.length , this.cartList);
    });
  }

}
