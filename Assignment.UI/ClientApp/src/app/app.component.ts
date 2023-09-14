import { Component, OnDestroy, OnInit ,VERSION, Input } from '@angular/core';
import { AccountService } from './_services/account.service';
import { TokenResponse, User } from './_models/user';
import { ConfigService } from './_services/config.service';
import { Subscription, interval , BehaviorSubject, timer } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';

@Component({ selector: 'app-root', templateUrl: 'app.component.html',
styleUrls: ['./app.component.css'] 
})
export class AppComponent implements OnInit , OnDestroy{
    logo:any;
    cart:any;
    profile:any;
    title:any;
    user?: User | null;
    userLogin:any | null;
    userRole:any;
    adminValueCheck:any = "admin"
    browserRefresh = false;
    counter=1;
    private subscription!: Subscription;
    secondsToDday:any;
    originalSeconds:any;
    minutesToDday:any;
    originalMinutes:any;
    

    images = [
        {
            imageSrc:'https://mdbootstrap.com/img/Photos/Slides/img%20(22).webp',
            imageAlt:'image1',
        },
        {
            imageSrc:'https://mdbootstrap.com/img/Photos/Slides/img%20(15).webp',
            imageAlt:'image1',
        },
        {
            imageSrc:'https://mdbootstrap.com/img/Photos/Slides/img%20(23).webp',
            imageAlt:'image1',
        }
    ]

    constructor(private accountService: AccountService, private configService:ConfigService , private router:Router) {
        this.accountService.user.subscribe((x) => {
            this.user = x
            this.userLogin = this.accountService.userValue;
            this.userRole = this.userLogin?.userName;
            this.secondsToDday=60;
            this.minutesToDday = 5;  
            this.originalMinutes = this.minutesToDday;
            this.originalSeconds = this.secondsToDday;
        });
        this.subscription = router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
              this.browserRefresh = !router.navigated;
              this.counter=this.counter+1;
              console.log("Logged in ", this.browserRefresh)
            }
            
        });
        
        
    }
    ngOnInit(){
        this.profile = this.configService.getProfileLogo();
        this.cart = this.configService.getCartLogo();
        this.logo=this.configService.getLogo();
        this.title=this.configService.getTitle();
        this.subscription = interval(1000)
           .subscribe(x => { 
            this.getTimeDifference(); 
        });
        
    }
    logout() {
        this.accountService.logout();
    }
    private getTimeDifference () {
        console.log(this.counter);
        if(this.minutesToDday == 0 && this.secondsToDday == 1){
            this.ngOnDestroy();
        }
        if(this.minutesToDday == 1 && this.secondsToDday == 1)
        {
            var extend = Math.round((50*this.originalMinutes)/100);
            var ans = confirm("Do you want to extend the session by" + extend + " mins");  
            if (ans) {  
                this.minutesToDday = this.minutesToDday + extend;
                this.secondsToDday = 1;
            }
        }
        if(this.secondsToDday == 1){
            this.minutesToDday = this.minutesToDday -1;
            this.secondsToDday = 60;
        }
        else{
            this.secondsToDday = this.secondsToDday -1;
        }
        
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.logout();
    }
    // unregister() {
    //     var extend = Math.round((50*this.originalMinutes)/100);
    //     let dialogRef = this.dialog.open(DialogBoxComponent);
    //     dialogRef.afterClosed().subscribe(result => {
    //       // NOTE: The result can also be nothing if the user presses the `esc` key or clicks outside the dialog
    //       if (result == 'confirm') {
    //         this.minutesToDday = this.minutesToDday + extend;
    //         this.secondsToDday = 0;
    //       }
    //     })
    //   }

}