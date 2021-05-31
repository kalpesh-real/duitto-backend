import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  productUrl = "";
  orderClick=false;
  
  constructor(public sessionService: SessionService, private router: Router, public service:ApiService) { 
    this.service.productUrl='';
    if(sessionService.getUserProperty("userName") == undefined || sessionService.getUserProperty("userName") == "" ||sessionService.getUserProperty("userName") == null){
      this.sessionService.newCustomer =true;  
    }
    else{

    }
  }

  ngOnInit(): void {
  }
  goToOrderPage() {
    this. orderClick=true;
    if (this.service.productUrl.trim().length == 0) {
      return;
    }
    let url = "";
    if (this.sessionService.checkUserSection()) {
      url = "order";
    }
    else {
      url = "login";
    }

    this.router.navigate([url])
  }


}
