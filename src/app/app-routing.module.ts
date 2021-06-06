import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AdminUpdateOrderComponent } from './pages/admin-update-order/admin-update-order.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { ConfirmLoginComponent } from './pages/confirm-login/confirm-login.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { UserAdminPanelComponent } from './pages/user-admin-panel/user-admin-panel.component';
import { UserLoginRegistrationComponent } from './pages/user-login-registration/user-login-registration.component';

const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'login',component:UserLoginRegistrationComponent},
  {path:'order',component:OrderPageComponent},
  {path:'order/:id',component:OrderPageComponent},
  {path:'confirm/:key',component:ConfirmEmailComponent},
  {path:'ConfirmPassword/:key',component:ResetPasswordComponent},
  {path:'user/panel',component:UserAdminPanelComponent},
  {path:'admin/panel',component:AdminPanelComponent},
  {path:'admin/updateorder',component:AdminUpdateOrderComponent},
  {path:'confirmLogin/:id',component:ConfirmLoginComponent},
  
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
