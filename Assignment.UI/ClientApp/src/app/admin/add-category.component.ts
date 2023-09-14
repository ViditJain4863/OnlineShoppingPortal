import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../_services/alert.service';
import { TokenResponse } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { ConfigService } from '../_services/config.service';
import { CategoryService } from '../_services/category.service';


@Component({ templateUrl: 'add-category.component.html' })
export class AddCategoryComponent implements OnInit {
    form!: FormGroup;
    id?: number;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;
    user: TokenResponse | null;
    cNameLbl = "Please enter category name";
    cDescLbl = "Please enter category description";
    categoryLogo:any;
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private categoryService: CategoryService,
        private alertService:AlertService,
        private accountService: AccountService,
        private configService:ConfigService,
    ) {
        this.user = this.accountService.userValue;
        this.categoryLogo = this.configService.getCategoryLogo();
     }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.form = this.formBuilder.group({
            categoryName: ['', Validators.required],
            categoryDescription: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        this.submitting = true;

        //calling the service method to register and store the category in the DB
        this.categoryService.registerCategory(this.form.value)
            .subscribe({
                next: () => {
                    this.alertService.success(' New Category Added', { keepAfterRouteChange: true });
                    this.router.navigateByUrl('/admin');
                },
                error: (error: any) => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            })
    }
}