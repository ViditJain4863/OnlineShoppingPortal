import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';
import { AlertService } from '../_services/alert.service';
import { ConfigService } from '../_services/config.service';
import { UserService } from '../_services/user.service';


@Component({ templateUrl: 'add-edit-user.component.html' })
export class AddEditUserComponent implements OnInit {
    form!: FormGroup;
    id?: number;
    title!: string;
    loading = false;
    submitted = false;
    signUpLogo:any;

    //Assigning placeholders to the input fields
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
        private configService:ConfigService,
        private userService:UserService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        console.log("id is ",this.id);
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

        if (this.id) {
            // edit mode
            this.title = 'Edit App';
            this.loading = true;
            this.accountService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.patchValue(x);
                    this.loading = false;
                });
        }
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

        //calling the service method to update the users information and update it in the DB
        this.accountService.update(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    console.log("Inside the loop");
                    this.alertService.success('Updations successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../admin/users'], { relativeTo: this.route });
                },
                error: error => {
                    console.log("Error inside");
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}