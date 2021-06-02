import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';
import { Dialog } from 'src/app/Utils/dialog';
@Component({
  selector: 'app-username-request-reasonform',
  templateUrl: './username-request-reasonform.component.html',
  styleUrls: ['./username-request-reasonform.component.css']
})
export class UsernameRequestReasonformComponent implements OnInit {
  @Input() data: any;
  show=false;
  usernameRequestForm: FormGroup;
  usernameRequestIsSubmitted = false;
  reasonError=false;
  reason;
  constructor(public dialog:MatDialogRef<UsernameRequestReasonformComponent>,private fb: FormBuilder, private service: ApiService, public sessionService: SessionService, public router: Router, public dialogService: Dialog) { }

  ngOnInit(): void {
   
  }
 
  requestToAdminForReservedUserName(){
    this.show=true;
    if(this.reason == ""){
      this.reasonError=true;
    }
    this.usernameRequestIsSubmitted=true;
    let data={
      "reason":this.reason,
      "custId":this.sessionService.getUserProperty('id'),
      "reservedUserName":this.sessionService.get('reservedUserName')
    }
  
    this.service.apiPOST("requestToAdminForReservedUserName", data).subscribe((result: any) => {
      this.show=false;
     
      if (result.status == true) {
       this.dialogService.showAlert("success","Success!","Your Username Request sent successfully.");
       this.dialog.close();
       this.sessionService.clear('reservedUserName');
      }
      else{
        this.dialogService.showAlert("error","Oops!","Something went wrong! try after some time.");
        this.sessionService.clear('reservedUserName');
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
    this.sessionService.clear('reservedUserName');
  }

}
