import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';
import { Dialog } from 'src/app/Utils/dialog';


@Component({
  selector: 'app-admin-update-order',
  templateUrl: './admin-update-order.component.html',
  styleUrls: ['./admin-update-order.component.css']
})
export class AdminUpdateOrderComponent implements OnInit {
  show=false;
  orderForm: FormGroup;
  orderNumber:any ;
  orderPlacementDate:any = this.service.orderDetails.isCreatedOn;
  rejectReasonSection= false;
  formatedshippedDate ; 
  constructor(public service: ApiService, public sessionService: SessionService,private fb: FormBuilder,public dialogService:Dialog,public router:Router) { }

  ngOnInit(): void {

    this.initForm();
    let orderDetails:any = this.service.orderDetails;
    this.orderNumber = this.service.orderDetails.id;
    this.orderPlacementDate = this.service.orderDetails.isCreatedOn;
    this.formatedshippedDate =  new Date(this.service.orderDetails.shippedDate);
   
  }
  dateFormat(timestamp){
    return new Date(timestamp).toDateString();
  }
  initForm() {
    this.orderForm = this.fb.group({
      productUrl: [this.service.orderDetails.productUrl],
      shippingAddress: [this.service.orderDetails.addressLine1],
      currency: [this.service.orderDetails.currency],
      country: [this.service.orderDetails.country],
      status: [this.service.orderDetails.status, Validators.required],
      estDeliveryDays: [this.service.orderDetails.estimatedDeliveryDays, Validators.required],
      rejectedReason: [this.service.orderDetails.rejectedReason,Validators.required],
      billingAddress: [this.service.orderDetails.addressLine1],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern("^[0-9]+")]],
      quantity: [1, Validators.required],
      adyenPspReference:["", Validators.required],
      adyenMerchantRefNo:["", Validators.required],
      adyenResultCode:["", Validators.required],
      deliveryCost:["", Validators.required],
      price:["", Validators.required], 
      total:["", Validators.required],
      consignmentStatus:[this.service.orderDetails.consignmentStatus, Validators.required],
      shippedDate:[this.service.orderDetails.shippedDate, Validators.required],
      estDeliverydays:[this.service.orderDetails.estimatedDeliveryDays, Validators.required]
      
    });
  }

   update(){
    let data:any = this.service.orderDetails;
   // let formatShippedDate = this.dateFormat(this.orderForm.value.shippedDate);

     data['estimatedDeliveryDays'] = this.orderForm.value.estDeliverydays;
     data['shippedDate'] = this.orderForm.value.shippedDate;
     data['consignmentStatus'] = this.orderForm.value.consignmentStatus;
     data['rejectedReason'] = this.orderForm.value.rejectedReason;
     data['status'] = this.orderForm.value.status;
    
     this.service.apiPOST("/updateOrderByAdmin", data).subscribe((result: any) => {

       //let customerDetails = result.data;
       if(result.status == true){
        this.dialogService.showAlert("success","Success!","Order successfully updated.!");
        this.router.navigate(['/admin/panel']);
       }
       else{

       }


    })

   }
   selectedStatus(status){
     if(status=="reject"){
      this.rejectReasonSection =true;
     }
    
   }
}
