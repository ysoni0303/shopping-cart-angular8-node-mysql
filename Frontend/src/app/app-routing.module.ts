import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { change_passwordComponent } from './user/change-password/change-password.component';
import { CustomerProfileComponent } from './user/customer-profile/customer-profile.component';
import { CustomerOrderComponent } from './user/customer-order/customer-order.component';
import { CustomerOrderDetailsComponent } from './user/customer-order-details/customer-order-details.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutProcessComponent } from './checkout-process/checkout-process.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'customer-profile-password', component: change_passwordComponent },
  { path: 'customer-profile', component: CustomerProfileComponent },
  { path: 'customer-order', component: CustomerOrderComponent },
  { path: 'customer-order-details', component: CustomerOrderDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product-details/:product_slug', component: ProductDetailsComponent },
  { path: 'checkout', component: CheckoutProcessComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
