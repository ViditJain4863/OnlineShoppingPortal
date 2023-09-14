import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../_services/alert.service';
import { TokenResponse } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { ConfigService } from '../_services/config.service';
import { ProductService } from '../_services/product.service';
import { CategoryService } from '../_services/category.service';
import { Category } from '../_models/category';


@Component({ templateUrl: 'add-product.component.html' })
export class AddProductComponent implements OnInit {
    form!: FormGroup;
    id?: number;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;
    user: TokenResponse | null;
    pNameLbl = "Please enter category name";
    pDescLbl = "Please enter category description";
    pImgLbl ="Please enter the image label link";
    pPriceLbl ="Please enter the price label";
    pCtryLbl ="Please enter the product country";
    pCategoryLbl ="PLease enter the product category";
    productLogo:any;
    categories?:Category[];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private alertService:AlertService,
        private accountService: AccountService,
        private configService:ConfigService,
        private categoryService:CategoryService
    ) {
        this.user = this.accountService.userValue;
     }

    ngOnInit() {
        this.productLogo =  this.configService.getProductLogo();
        this.id = this.route.snapshot.params['id'];
        this.form = this.formBuilder.group({
            productName: ['', Validators.required],
            productDescription: ['', Validators.required],
            productImage: ['', Validators.required],
            productPrice: ['', Validators.required],
            productCountry: ['', Validators.required],
            productCategory:['',Validators.required]
        });
        
        //Fetching the categories list
        this.categoryService.getAllCategory().subscribe(categories => this.categories = categories);

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

        //calling the service method to register the product information and add it in the DB
        this.productService.registerProduct(this.form.value)
            .subscribe({
                next: () => {
                    this.alertService.success('New Product Added', { keepAfterRouteChange: true });
                    this.router.navigateByUrl('/admin');
                },
                error: (error: any) => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            })
    }
}