import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';
import { Dialog } from 'src/app/Utils/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent implements OnInit {
  orderForm: FormGroup;
  orderSubmitted = false;
  orderApproved=false;
  show=false;
  orderId=null;
  orderDetails:any;
  islenear=true;
  goForCheckout=false;
  @ViewChild('stepper') private myStepper: MatStepper;
  constructor(private _Activatedroute:ActivatedRoute,private fb: FormBuilder, public service: ApiService, public sessionService: SessionService, public dialogService:Dialog,public router:Router) { }

  ngOnInit(): void {
    this.initForm();
    this.orderId=this._Activatedroute.snapshot.paramMap.get("id");
    this.getOrderDetails();
  }
  initForm() {
    this.orderForm = this.fb.group({
      productUrl: [this.service.productUrl, Validators.required],
      nameTitle: ['mr', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: [''],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      addressLine3: [''],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern("^[0-9]+")]],
      country: ['in', Validators.required],
      currency: ['usd', Validators.required],
      quantity: [1, Validators.required],
    });
  }
  placeOrder() {
    this.orderSubmitted = true;
    if (!this.orderForm.invalid) {
     let custId = this.sessionService.getUserProperty("id");
     this.orderForm.value['consignmentStatus']='0';
     this.orderForm.value['status']='0';
     this.show=true;
      this.service.apiPOST(custId+"/saveOrder", this.orderForm.value).subscribe((result: any) => {
        this.show=false;
        if (result.status == true) {
          this.dialogService.showAlert("success","Success!","Your order successfully place! Please wait for approval");
          this.router.navigate(['/user/panel']);
        }
        else{
          this.dialogService.showAlert("error","Oops!","Something went wrong! try after some time.");
        }

      },(error:any)=>{
        this.show=false;
        if(error.status==401){
          this.sessionService.clearAll();
          this.router.navigate(['/']);
          this.dialogService.showAlert("warning","Warning","Session Expired! please login again");
        }
       else if(error.status==403){
        this.dialogService.showAlert("warning","Warning","Autorities Error");
       }else{
        this.dialogService.showAlert("error","Oops!","Internal Server eror occured! try after some time.");
       }

      })
    }
  }
  getOrderDetails(){

    this.service.apiGET("getOrderDetails/"+this.orderId).subscribe((result:any)=>{
      this.show=false;
      if(result.status==true){
        this.orderDetails=result.data;
        if(this.orderDetails.status == "approve"){
          this.orderApproved=true;
          this.islenear=false;
          this.myStepper.next();
        }
      }
    },(error:any)=>{
      this.show=false;
      if(error.status==401){
        this.sessionService.clearAll();
        this.router.navigate(['/']);
        this.dialogService.showAlert("warning","Warning","Session Expired! please login again");
      }
     else if(error.status==403){
      this.dialogService.showAlert("warning","Warning","Autorities Error");
     }else{
      this.dialogService.showAlert("error","Oops!","Internal Server eror occured! try after some time.");
     }

    })
  }
  goToNext(input){
     if(input == "goForCheckout"){
      this.goForCheckout =true;
      this.myStepper.next();
     }else if(input == "cancelCheckout"){
      
     }
  }
}
