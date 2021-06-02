import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';
import { Dialog } from 'src/app/Utils/dialog';
import {MatDialog} from '@angular/material/dialog';
import { UsernameRequestReasonformComponent } from '../username-request-reasonform/username-request-reasonform.component';

@Component({
  selector: 'app-username-setup',
  templateUrl: './username-setup.component.html',
  styleUrls: ['./username-setup.component.css']
})
export class UsernameSetupComponent implements OnInit {
  userName:any;
  customerId;
  show=false;
  fullName;
  userNameSuggestion;
  reservedUserName;
  userNameSuggestionLabel =false;
  skipClicked=false;
  usernameError=false;
  reservedUserNameLabel=false;
  constructor(public dialog: MatDialog,private service: ApiService, public sessionService: SessionService, public router: Router, public dialogService: Dialog) { }

  ngOnInit(): void {
  }
 
  saveUsername(){
    if(this.usernameError==false){
    this.customerId = this.sessionService.getUserProperty('id');
    let data = this.sessionService.get("user");
    data['userName'] = this.userName;

    this.service.apiPOST("signup", data).subscribe((result: any) => {
      this.show=false;
      if (result.status == true) {
        this.sessionService.clear('user');
        this.sessionService.set('user', result.data);
        this.sessionService.newCustomer=false;
        this.router.navigate(['/']);
        this.dialogService.showAlert("success","Success!","Your Username successfully Updated.");
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
  skipForUsername(){
    this.skipClicked=true;
    this.userName = this.sessionService.getUserProperty('fullName').replace(/\s/g, "").toLowerCase();
    this.onBlurEvent();
    //this.saveUsername();
 
  }
  onBlurEvent(){

    let data ={
      "uname":this.userName
    }
if(this.userName !=""){
    this.service.apiPOST("userNameVerification", data).subscribe((result: any) => {
      this.show=false;
      if(this.skipClicked!=true){
        if (result.status == false && result.uname == "NA" && result.reserveduname =="NA") {
          this.userNameSuggestionLabel = true;
          this.userNameSuggestion = this.userName;
         }else if(result.reserveduname == "NA" && result.uname != ""){
         this.userNameSuggestionLabel = true;
         this.userNameSuggestion = this.userName+"-"+this.randomUserName();
         this.usernameError=true;
          }else if(result.reserveduname != "" && result.uname == "NA"){
            this.reservedUserNameLabel = true;
            this.userNameSuggestionLabel = true;
            this.userNameSuggestion = this.userName+"-"+this.randomUserName();
            this.reservedUserName = this.userName;
           }
        }else{
        if (result.status == false && result.uname == "NA") {
           this.saveUsername();
         }
        else{
        this.userName = this.userName+"-"+this.randomUserName();
         this.saveUsername();
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
  }else{
    this.userNameSuggestionLabel = false;
    this.reservedUserNameLabel = false;
  }
  }
  randomUserName(){
    this.usernameError=false;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 4; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
setUnameFromSuggestion(){
  this.usernameError=false;
  this.userName = this.userNameSuggestion;
  this.userNameSuggestionLabel = false;
}
setUnameFromReserved(){
  this.sessionService.set('reservedUserName',this.reservedUserName);
  const dialogRef = this.dialog.open(UsernameRequestReasonformComponent, {
  
   
  });
  dialogRef.afterClosed().subscribe(result => {
    this.userNameSuggestionLabel = false;
    this.reservedUserNameLabel = false;
    this.userName = this.userName+"-"+this.randomUserName();
    this.saveUsername();


  });
 
}
}
