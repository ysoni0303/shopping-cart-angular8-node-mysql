import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as $ from "jquery";
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './common/header/header.component';
import { CheckoutHeaderComponent } from './common/checkout-header/checkout-header.component';
import { PopupComponent } from './common/popup/popup.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SideHeaderComponent } from './user/side-header/side-header.component';
import { TopHeaderComponent } from './user/top-header/top-header.component';
import { change_passwordComponent } from './user/change-password/change-password.component';
import { CustomerProfileComponent } from './user/customer-profile/customer-profile.component';
import { CustomerOrderComponent } from './user/customer-order/customer-order.component';
import { CustomerOrderDetailsComponent } from './user/customer-order-details/customer-order-details.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutProcessComponent } from './checkout-process/checkout-process.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PopupComponent,
    CheckoutHeaderComponent,
    LoginComponent,
    SignupComponent,
    SideHeaderComponent,
    TopHeaderComponent,
    change_passwordComponent,
    CustomerProfileComponent,
    CustomerOrderComponent,
    CustomerOrderDetailsComponent,
    CartComponent,
    ProductComponent,
    ProductDetailsComponent,
    CheckoutProcessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
