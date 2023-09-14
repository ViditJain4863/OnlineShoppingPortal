import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/_models/cart';
import { TokenResponse, User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {
   steps:any = 1;
   form!: FormGroup;
   loading = false;
   submitted = false;
  
    user:any;
  cartList?:Cart[];
  userInfo?:User[];
  //userValue?:User;
  fNameLbl = "Please enter first name ";
  lNameLbl = "Please enter last name";
  houseNoLbl = "Please enter the house Number";
  addressLine1Lbl = "Please enter address Line 1";
  addressLine2Lbl = "Please enter address Line 2";
  cityLbl = "Please enter your city";
  firstNameCopy:any;
  lastNameCopy:any;

  constructor(  private alertService: AlertService, private route: ActivatedRoute, private router: Router, private acc:AccountService, 
    private cartService:CartService, private accountService:AccountService, private formBuilder: FormBuilder) {  
      //this.user=this.acc.userValue;
      // this.accountService.getAllUsers().subscribe((userInfo) => {
      //   this.userInfo = userInfo.filter(x=> x.username == this.user?.userName);
      //   this.getFirstValue(this.userInfo);
      // });
  }

  ngOnInit(): void {
    // this.cartService.getAllCart().subscribe((cartList) => {
    //   this.cartList = cartList.filter(x=>x.cartStatus!='Added' && x.userName ==this.user.userName)
    // });
    this.form = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName: ['', Validators.required],
      houseNo: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city:['',Validators.required]
  });
  }

  // getFirstValue(userInfo:User[]):void {
  //     this.userValue = userInfo[0];
  // }

  get f() { return this.form.controls; }

  submit(){
    // console.log(this.form.value);
    // console.log(this.firstNameCopy + " " + this.lastNameCopy + " see");
    this.steps = this.steps + 1;
    // this.firstNameCopy = this.firstName;
    // this.lastNameCopy = this.lastName;
    // console.log(this.firstNameCopy + " " + this.lastNameCopy + " see");
  }
  previousStep(){
    this.steps = this.steps -1;
    console.log(this.firstNameCopy + " " + this.lastNameCopy+ "saw");
  }
    
}
