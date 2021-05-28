import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Dialog } from 'src/app/Utils/dialog';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  key: string;
  resetForm: FormGroup;
  show=false;
  constructor(private route: ActivatedRoute, public service: ApiService, public fb: FormBuilder,public dialogService:Dialog,public router:Router) {
    this.route.params.subscribe(params => {
      console.log(params)
      this.key = params.key

    });
  }

  ngOnInit(): void {

    this.resetForm = this.fb.group({
      password: [null, Validators.compose([
        Validators.required,
        this.patternValidator(/\d/, { hasNumber: true }),
        this.patternValidator(/[A-Za-z]/, { hasLater: true }),
        Validators.minLength(10)])
      ],
      confirmPassword: ['', Validators.required],
    },{validator: this.checkPasswords});

  }
  formSubmit = false;
  confirmEmail() {
    this.formSubmit = true;

    if (!this.resetForm.invalid) {
      this.resetForm.value["key"]=this.key;
      this.show=true;
      this.service.apiPOST("auth/resetpassword",this.resetForm.value).subscribe((result:any)=>{
        this.show=false;
        if(result.status==1){
          this.dialogService.showAlert("success", "Success", result.mesage);
          this.router.navigate(['/login']);
        }
        else{
          this.dialogService.showAlert("error", "Error", result.mesage);
        }
      },(error:any)=>{
        this.show=false;
        this.dialogService.showAlert("error", "Error", "Problem with password reset");
      })
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

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { notSame: true }
  }
}
