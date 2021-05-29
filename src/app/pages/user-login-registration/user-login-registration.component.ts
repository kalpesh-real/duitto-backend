import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';
import { Dialog } from 'src/app/Utils/dialog';
@Component({
  selector: 'app-user-login-registration',
  templateUrl: './user-login-registration.component.html',
  styleUrls: ['./user-login-registration.component.css'],
})
export class UserLoginRegistrationComponent implements OnInit {

  registerForm: FormGroup;
  loginForm: FormGroup;
  
  registerIsSubmitted = false;
  loginIsSubmitted = false;
  newCustomer = true;
  
  show=false;
  constructor(private fb: FormBuilder, private service: ApiService, public sessionService: SessionService, public router: Router, public dialogService: Dialog) {
    this.initFormGrup();
  }

  ngOnInit(): void {
  }
  initFormGrup() {
    this.registerForm = this.fb.group({
      // newregister: ['true'],
   
      fullName: ['', Validators.required],
     
      email: ['', [Validators.required, Validators.email]]
     
     
     
    });


    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
     
    });

   

  }
  registerUser() {
    this.registerIsSubmitted = true;
    if (!this.registerForm.invalid) {
      this.show=true;
      this.registerForm.value["userRole"]="USER"
      this.service.apiPOST("signup", this.registerForm.value).subscribe((result: any) => {
        this.show=false;
        if (result.status == true) {
          this.dialogService.showAlert("success", "Success!", "Successfuly registered! Please check your registered email inbox and verify your email.");
          this.newCustomer=false;
        }
        else {
          this.dialogService.showAlert("error", "Oops!", result.message);
        }
      }, (error: any) => {
        this.show=false;
        this.dialogService.showAlert("error", "Oops!", "Something went wrong! try after some time.");
      })

    }
  }
  logIn() {
    this.loginIsSubmitted = true;
    this.show=true;
    if (!this.loginForm.invalid && !this.loginForm.errors) {
      this.service.apiPOST("signin", this.loginForm.value).subscribe((result: any) => {
        this.show=false;
        if (result.status == true) {
          this.dialogService.showAlert("success", "Success!", "One time login  link sent to your registered email.");
         // this.sessionService.set("user", result.data);
          //let tokenStr = 'Bearer ' + result.token;
          //localStorage.setItem('token', tokenStr);
          this.router.navigate(['/']);
        }
        else {
          this.dialogService.showAlert("error", "Inturupt!", result.mesage);

        }
      }, (error: any) => {
        this.show=false;
        this.dialogService.showAlert("error", "Oops!", "Something went wrong! try after some time.");
      })
    }
  }



  changeTab(action) {
    if (action == "new") {
      this.newCustomer = true;
    } else {
      this.newCustomer = false;
    }

  }

  patternValidator(regex: RegExp, error: ValidationErrors) {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

}
