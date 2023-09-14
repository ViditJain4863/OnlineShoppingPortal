import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddProductComponent } from './add-product.component';
import { AddCategoryComponent } from './add-category.component';
import { LayoutAdminComponent } from './layout-admin.component';
import { UsersListComponent } from './users-list.component';
import { ProductsListComponent } from './products-list.component';
import { AddEditUserComponent } from './add-edit-user.component';

const routes: Routes = [
    {
        path: '', component: LayoutAdminComponent,
        children: [
            { path: '', component: AdminComponent },
            { path: 'product', component: AddProductComponent },
            {path :'category', component:AddCategoryComponent},
            {path :'users', component:UsersListComponent},
            {path :'pList', component:ProductsListComponent},
            { path: 'edit/:id', component: AddEditUserComponent },
        //     // { path: ':pId', component:TrackerComponent}
        //     { path: ':pId',loadChildren: trackerModule, canActivate: [AuthGuard] }
         ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }