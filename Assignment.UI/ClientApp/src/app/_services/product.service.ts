import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../_models/product';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import { formatDate } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ProductService {
    user:any;
    constructor(private http: HttpClient, private acc:AccountService) { 
        this.user= this.acc.userValue;
    }    
    
    public getAllProduct() {
        return this.http.get<Product[]>(`${environment.apiUrl}/api/Product`);
    }

    public getById(id: number) {
        return this.http.get<Product[]>(`${environment.apiUrl}/api/Product/`+id);
    }

    public registerProduct(product: Product) : Observable<any> {
        var ticketDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        product.productAddedOn  = ticketDate.toString();
        console.log(product);
        //product.userName = this.user.userName;
        return this.http.post<any>(`${environment.apiUrl}/api/Product`, product);
        
    }
    public deleteProduct(id:number):Observable<number>{
        console.log("please confirm",id);
        console.log('${environment.apiUrl}/api/Product/${id}');
        return this.http.delete<number>(`${environment.apiUrl}/api/Product/`+id);
        //return this.http.delete<number>(`${environment.apiUrl}/api/Product`,{params:{id}});
    }
    public updateProduct(data:any, id: number):Observable<any> {
        return this.http.patch<Product[]>(`${environment.apiUrl}/api/Product/${id}`,data);
    }
 
}