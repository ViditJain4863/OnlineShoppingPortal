import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { ErrorInterceptor } from "./_helpers/error.interceptor";
import { HomeComponent } from "./home/home.component";
import { AlertComponent } from "./_components/alert.component";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CarosuelComponent } from './carosuel/carosuel.component';
import { LayoutAdminComponent } from "./admin/layout-admin.component";
import { LayoutItemComponent } from "./item/layout-item.component";
import { CartComponent } from "./item/cart/cart.component";
import { OrderComponent } from "./item/order/order.component";
import { BookItemComponent } from "./item/cart/book-item.component";
import { ProductsListComponent } from "./admin/products-list.component";
import { DialogBoxComponent } from "./users/dialog-box.component";

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        CarosuelComponent,
        LayoutAdminComponent,
        LayoutItemComponent,
        CartComponent,
        OrderComponent,
        BookItemComponent,
        ProductsListComponent,
        DialogBoxComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent], 
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { };