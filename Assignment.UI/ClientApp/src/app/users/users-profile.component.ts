import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';
import { App } from '../_models/app';
import { AccountService } from '../_services/account.service';
import { TokenResponse, User } from '../_models/user';
import { Cart } from '../_models/cart';
import { CartService } from '../_services/cart.service';


@Component({ templateUrl: 'users-profile.component.html' })
export class UsersProfileComponent implements OnInit {
    apps?: App[];
    user:TokenResponse | null;;
    userInfo?:User[];
    userValue?:User;
    cartList?:Cart[];
    constructor(private userService: UserService, private accountService:AccountService, private cartService:CartService) {
        this.user = this.accountService.userValue;

        this.accountService.getAllUsers().subscribe((userInfo) => {
            this.userInfo = userInfo.filter(x=> x.username == this.user?.userName);

            this.getFirstValue(this.userInfo);
        });

    }

    ngOnInit() {
        this.userService.getAll()
           // .pipe(first())
            .subscribe(apps => this.apps = apps);

        this.cartService.getAllCart().subscribe((cartList) => {
            this.cartList = cartList;
        }); 
    }

    getFirstValue(userInfo:User[]):void {
        this.userValue = userInfo[0];
    }

}