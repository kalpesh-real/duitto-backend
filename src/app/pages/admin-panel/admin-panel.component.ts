import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';
import { Dialog } from 'src/app/Utils/dialog';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  displayedColumns: string[] = ['Order Number', 'Quantity', 'Summary', 'Order Date', 'Status', 'Action'];
  show = false;
  dataSource = [];
  constructor(public service: ApiService, public sessionService: SessionService, public router: Router, public dialogService: Dialog) { }

  ngOnInit(): void {
    this.getAllOrders();
  }
  getAllOrders() {
    let custId = this.sessionService.getUserProperty("id");
    if (custId) {
      this.show = true;
      this.service.apiGET("getAllOrders").subscribe((result: any) => {
        this.show = false;
        if (result.status == true) {
          this.dataSource = result.data;
        }
      }, (error: any) => {
        this.show = false;
        if (error.status == 401) {
          this.sessionService.clearAll();
          this.router.navigate(['/']);
          this.dialogService.showAlert("warning", "Warning", "Session Expired! please login again");
        }
        else if (error.status == 403) {
          this.dialogService.showAlert("warning", "Warning", "Autorities Error");
        } else {
          this.dialogService.showAlert("error", "Oops!", "Internal Server eror occured! try after some time.");
        }

      })
    }
  }

  formatToDate(timrstamp) {
    return new Date(timrstamp).toDateString();
  }
  updateOrder(element){
    this.service.orderDetails = element;
    this.router.navigate(['/admin/updateorder']);
  }

}
