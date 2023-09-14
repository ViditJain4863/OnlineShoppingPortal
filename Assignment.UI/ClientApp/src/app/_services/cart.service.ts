import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../_models/cart';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
import { Product } from '../_models/product';

@Injectable({ providedIn: 'root' })
export class CartService {
    user:any;
    cart:Cart = new Cart();
    constructor(private http: HttpClient) { 
    }    
    
    public getAllCart() {
        return this.http.get<Cart[]>(`${environment.apiUrl}/api/Cart`);
    }

    public getById(id: number) {
        return this.http.get<Cart[]>(`${environment.apiUrl}/api/Cart/`+id);
    }

    public delete(id: number) {
        return this.http.delete<Cart[]>(`${environment.apiUrl}/api/Cart/${id}`);
    }

    public registerCart(product: Product, userName:string) : Observable<any> {
        var ticketDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        console.log("Product Id", product.id);
        this.cart.productCategory = product.productCategory;
        this.cart.productPrice = product.productPrice?.toString();
        this.cart.productName = product.productName;
        this.cart.cartStatus = "Added";
        this.cart.productQuantity = 1;
        this.cart.productImage = product.productImage;
        this.cart.userName = userName;
        this.cart.productId = product.id;
        this.cart.productCartAdd = ticketDate.toString();
        this.cart.productCartPlaced = ticketDate.toString();
        this.cart.productCartShipped = ticketDate.toString();
        this.cart.productCartDispatch = ticketDate.toString();
        return this.http.post<any>(`${environment.apiUrl}/api/Cart`, this.cart);
    }

    public updateCart(cartDetail:Cart):Observable<any> {
        var ticketDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        this.cart.id = cartDetail.id;
        this.cart.productCategory = cartDetail.productCategory;
        this.cart.productPrice = cartDetail.productPrice?.toString();
        this.cart.productName = cartDetail.productName;
        this.cart.productQuantity = 1;
        this.cart.productImage = cartDetail.productImage;
        this.cart.userName = cartDetail.userName;
        this.cart.productId = cartDetail.productId;
        this.cart.productCartAdd = cartDetail.productCartAdd;
        this.cart.productCartPlaced = ticketDate.toString();
        this.cart.productCartShipped = ticketDate.toString();
        this.cart.productCartDispatch = ticketDate.toString();
        if(cartDetail.cartStatus == "Added") { this.cart.cartStatus = "Purchased";}
        if(cartDetail.cartStatus == "Purchased") { this.cart.cartStatus = "Shipped";}
        if(cartDetail.cartStatus == "Shipped") { this.cart.cartStatus = "Dispatched";}
        return this.http.put<Cart[]>(`${environment.apiUrl}/api/Cart`,this.cart);
    }
 
}