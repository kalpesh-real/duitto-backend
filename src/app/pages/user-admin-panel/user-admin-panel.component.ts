import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';
import { Dialog } from 'src/app/Utils/dialog';

@Component({
  selector: 'app-user-admin-panel',
  templateUrl: './user-admin-panel.component.html',
  styleUrls: ['./user-admin-panel.component.css']
})
export class UserAdminPanelComponent implements OnInit {
  displayedColumns: string[] = ['Order Number', 'Quantity','Summary', 'Order Date' ,'Status', 'Action'];
  show=false;
  dataSource= [];
  constructor(public service:ApiService,public sessionService:SessionService,public router:Router, public dialogService:Dialog) {
    this. getAllOrders();
  }

  ngOnInit(): void {
  }
  getAllOrders(){
    let custId=this.sessionService.getUserProperty("id");
    if(custId){
      this.show=true;
      this.service.apiGET("getOrderHistory/"+custId).subscribe((result:any)=>{
        this.show=false;
        if(result.status==true){
          this.dataSource=result.data.orders;
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

  formatToDate(timrstamp){
    return new Date(timrstamp).toDateString();
  }
  goNextStep(element){
     if(element.Status != 'unapprove'){
      this.router.navigate(['/order/'+element.id]);
     }
  }
}
