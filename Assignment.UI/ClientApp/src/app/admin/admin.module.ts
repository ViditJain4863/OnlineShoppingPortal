import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AddCategoryComponent } from './add-category.component';
import { AddProductComponent } from './add-product.component';
import { UsersListComponent } from './users-list.component';
import { AddEditUserComponent } from './add-edit-user.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AdminRoutingModule
    ],
    declarations: [
        AdminComponent,
        AddCategoryComponent,
        AddProductComponent,
        UsersListComponent,
        AddEditUserComponent
    ]
})
export class AdminModule { }