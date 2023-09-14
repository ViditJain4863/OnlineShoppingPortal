import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';
import { AlertService } from '../_services/alert.service';
import { ConfigService } from '../_services/config.service';


@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    signUpLogo:any;
    fNameLbl = "Please enter first name ";
    lNameLbl = "Please enter last name";
    uNameLbl = "Please enter user name ";
    emailAddLbl = "Please enter your email address ";
    pswdLbl = "Please enter password ";
    mobileNumLbl = "Please enter mobile number";
    pincodeLbl = "Please enter pincode"
    genderValue:any;
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private configService:ConfigService
    ) { }

    ngOnInit() {
        this.signUpLogo = this.configService.getSignUpLogo();
        this.form = this.formBuilder.group({
            emailAddress:['',Validators.required],
            firstName:['',Validators.required],
            lastName:['',Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            country:['',Validators.required],
            mobileNumber:['',Validators.required],
            gender: ['', Validators.required],
            pincode:['',Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        console.log(this.genderValue);
        this.submitted = true;
        console.log(this.form.controls);
        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        console.log('this.form.value => ',this.form.value)
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    console.log("Inside the loop");
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error: error => {
                    console.log("Error inside");
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}