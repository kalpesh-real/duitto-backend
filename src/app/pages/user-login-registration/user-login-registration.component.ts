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
  resetPasswordForm:FormGroup;
  registerIsSubmitted = false;
  loginIsSubmitted = false;
  newCustomer = true;
  forgotPassword = false;
  show=false;
  constructor(private fb: FormBuilder, private service: ApiService, public sessionService: SessionService, public router: Router, public dialogService: Dialog) {
    this.initFormGrup();
  }

  ngOnInit(): void {
  }
  initFormGrup() {
    this.registerForm = this.fb.group({
      // newregister: ['true'],
      nameTitle: ['mr', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      //  mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.email]],
      //  password: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9a-zA-Z]{10,}$")]],
      password: [ null, Validators.compose([
        Validators.required,
        this.patternValidator(/\d/, { hasNumber: true }),
        this.patternValidator(/[A-Za-z]/, { hasLater: true }),
        Validators.minLength(10)])
     ],
     
      // confirmPassword: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$")]],
    });


    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.resetPasswordForm = this.fb.group({
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
          this.sessionService.set("user", result.data);
          let tokenStr = 'Bearer ' + result.token;
          localStorage.setItem('token', tokenStr);
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

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { notSame: true }
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
  resetEmail='';
  resetFormSubmit=false;
  sentResetLink(){
    this.resetFormSubmit=true;

    if(!this.resetPasswordForm.invalid){
     this.show=true;
      this.service.apiPOST("auth/forgotpassword",this.resetPasswordForm.value).subscribe((result:any)=>{
        this.show=false;
        if(result.status==1){
          this.dialogService.showAlert("success", "Success", result.mesage);
        }
        else{
          this.dialogService.showAlert("error", "Error", result.mesage);
        }
      },(error:any)=>{
        this.show=false;
        this.dialogService.showAlert("error", "Error", "Problem with sending email");
      })
    }
  }
}
