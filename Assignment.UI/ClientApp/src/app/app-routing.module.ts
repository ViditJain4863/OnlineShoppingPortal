import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_helpers/auth.guard';
import { CartComponent } from './item/cart/cart.component';
import { OrderComponent } from './item/order/order.component';
import { BookItemComponent } from './item/cart/book-item.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const itemModule = () => import('./item/item.module').then(x => x.ItemModule);
const userModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'apps', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule  },
    { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard]  },
    { path: 'item', loadChildren: itemModule , canActivate: [AuthGuard] },
    { path: 'user', loadChildren: userModule , canActivate: [AuthGuard] },
    { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
    { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
    { path: 'buy', component: BookItemComponent, canActivate: [AuthGuard] },
    

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }