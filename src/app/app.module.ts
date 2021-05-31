import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './component/header-component/header-component.component';
import { UserLoginRegistrationComponent } from './pages/user-login-registration/user-login-registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { Dialog } from './Utils/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './component/footer/footer.component';
import { InterceptorService } from './services/interceptor.service';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { UserAdminPanelComponent } from './pages/user-admin-panel/user-admin-panel.component';
import {MatTableModule} from '@angular/material/table';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AdminUpdateOrderComponent } from './pages/admin-update-order/admin-update-order.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfirmLoginComponent } from './pages/confirm-login/confirm-login.component';
import { UsernameSetupComponent } from './pages/username-setup/username-setup.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    UserLoginRegistrationComponent,
    HomePageComponent,
    OrderPageComponent,
    FooterComponent,
    ConfirmEmailComponent,
    ResetPasswordComponent,
    UserAdminPanelComponent,
    AdminPanelComponent,
    AdminUpdateOrderComponent,
    ConfirmLoginComponent,
    UsernameSetupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatStepperModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    NgbModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule
    
  ],
  providers: [Dialog,{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
