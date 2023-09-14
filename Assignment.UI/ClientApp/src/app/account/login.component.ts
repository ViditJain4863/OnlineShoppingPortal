import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';
import { AlertService } from '../_services/alert.service';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            emailAddress:['',Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        console.log('this.form.value => ',this.form.value)
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            console.log("Now it is goinng to stop since form is invalid");
            return;
        }

        this.loading = true;
        this.accountService.login(this.f.emailAddress.value,this.f.username.value, this.f.password.value)
           // .pipe(first())
            .subscribe({
                next: (data : any) => {
                    console.log('data',data);
                    console.log(data.userName)
                    if(data.userName=="admin"){
                        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
                        this.router.navigateByUrl(returnUrl);
                    }
                    else
                    {
                        // get return url from query parameters or default to home page
                        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                        this.router.navigateByUrl(returnUrl);
                    }
                    
                },
                error: (error: any) => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}