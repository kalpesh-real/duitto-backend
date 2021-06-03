import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';
import { Dialog } from 'src/app/Utils/dialog';

@Component({
  selector: 'app-confirm-login',
  templateUrl: './confirm-login.component.html',
  styleUrls: ['./confirm-login.component.css']
})
export class ConfirmLoginComponent implements OnInit {
  key:any;
  show=false;
  constructor(private route: ActivatedRoute,public service:ApiService,public router:Router,public dialogService:Dialog,public sessionService:SessionService) {
    if(sessionService.getUserProperty("userName") == undefined || sessionService.getUserProperty("userName") == "" ||sessionService.getUserProperty("userName") == null){
      this.sessionService.newCustomer =true;  
    }
    else{

    }
    this.key=this.route.snapshot.paramMap.get("id");
    
      this.confirmUserForLogin();

 
   }

  ngOnInit(): void {
    
  }
  confirmUserForLogin(){
   // this.sessionService.set("user", result.data);
         let tokenStr = 'Bearer ' + this.key;
         localStorage.setItem('token', tokenStr);
    this.service.apiGET("loginVerification/"+this.key).subscribe((result:any)=>{
      this.show=true;
      if(result.status==true){
        this.show=false;
         this.sessionService.set("user", result.data);
         this.router.navigate(['/']);
         //let tokenStr = 'Bearer ' + result.token;
        // localStorage.setItem('token', tokenStr);
        this.dialogService.showAlert("success", "Success!", "Login Successfully.");
       
      }
      else{
        this.dialogService.showAlert("error", "Error", "Link expired");
        this.router.navigate(['/'])
      }
    
    },(error=>{
      this.dialogService.showAlert("error", "Error", "Internal Server Error!");
      
    })
  )
}
  
}


