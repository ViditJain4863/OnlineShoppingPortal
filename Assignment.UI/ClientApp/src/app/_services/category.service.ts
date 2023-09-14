import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../_models/category';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import { formatDate } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    user:any;
    constructor(private http: HttpClient, private acc:AccountService) { 
        this.user= this.acc.userValue;
    }    
    
    public getAllCategory() {
        return this.http.get<Category[]>(`${environment.apiUrl}/api/Category`);
    }

    public getById(id: number) {
        return this.http.get<Category[]>(`${environment.apiUrl}/api/Category/`+id);
    }

    public registerCategory(category: Category) : Observable<any> {
        var ticketDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        category.categoryAddedOn  = ticketDate.toString();

        console.log(category);
        return this.http.post<any>(`${environment.apiUrl}/api/Category`, category);
    }
    public deleteCategory(id:number):Observable<number>{
        console.log("please confirm",id);
        console.log('${environment.apiUrl}/api/Category/${id}');
        return this.http.delete<number>(`${environment.apiUrl}/api/Category/`+id);
        //return this.http.delete<number>(`${environment.apiUrl}/api/Category`,{params:{id}});
    }
    public updateCategory(data:any, id: number):Observable<any> {
        return this.http.patch<Category[]>(`${environment.apiUrl}/api/Category/${id}`,data);
    }
 
}