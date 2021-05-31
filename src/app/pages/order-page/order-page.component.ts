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
 
  
  constructor(private _Activatedroute:ActivatedRoute,private fb: FormBuilder, public service: ApiService, public sessionService: SessionService, public dialogService:Dialog,public router:Router) { }

  ngOnInit(): void {
    
  }
  
}
