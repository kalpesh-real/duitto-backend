import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserLoginRegistrationComponent } from 'src/app/pages/user-login-registration/user-login-registration.component';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {

  constructor(public sessionService:SessionService, public dialog:MatDialog,public router:Router) { 
    if(sessionService.getUserProperty("userName") == undefined || sessionService.getUserProperty("userName") == "" ||sessionService.getUserProperty("userName") == null){
      this.sessionService.newCustomer =true;  
    }
    else{
      
    }

  }

  ngOnInit(): void {
  }
  openUserModal(){
    this.dialog.open(UserLoginRegistrationComponent);
  }
  logout(){
    this.sessionService.clearAll();
    this.router.navigate(['/']);
  }
}
