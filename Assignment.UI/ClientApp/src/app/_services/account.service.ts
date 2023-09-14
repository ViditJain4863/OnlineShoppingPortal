import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenResponse, User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';


@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<TokenResponse | null>;
    public emailAddress:any;
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    public get userEmail() {
        return this.emailAddress;
    }

    login(emailaddress:string,username: string, password: string) {
        const user : User = new User();
        user.emailAddress = emailaddress;
        user.username = username;
        user.password = password;
        this.emailAddress = emailaddress;
        //user.id =;
    //   let headers = new HttpHeaders({
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
              
    //  });
    // let options = { headers: headers };

        return this.http.post<TokenResponse>(`${environment.apiUrl}/api/Auth`, user)
            .pipe(map(user => {
                console.log(user);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                //console.log(user.id);
                this.userSubject.next(user);
                console.log('Juser ==> ',user)
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {  
        console.log("user logged in");
        console.log(user);
        user.id = 0;
        user.role = "User"
        user.userUpdateDate = "NULL";
        console.log(environment.apiUrl);
        return this.http.post<any>(`${environment.apiUrl}/api/User`, user);
    }

    public getAllUsers() {
        return this.http.get<User[]>(`${environment.apiUrl}/api/User`);
    }

    public delete(id: number) {
        return this.http.delete<User[]>(`${environment.apiUrl}/api/User/${id}`);
    }

    public update(user:User) {
        user.userUpdateDate = formatDate(new Date(), 'yyyy-MM-dd', 'en').toString();
        console.log(user);
        return this.http.put<User[]>(`${environment.apiUrl}/api/User`, user);
    }

    public getById(id: number) {
        return this.http.get<User[]>(`${environment.apiUrl}/api/User/${id}`);
    }

}   