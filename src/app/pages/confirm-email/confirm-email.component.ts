import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { ApiService } from 'src/app/services/api.service';
import { Dialog } from 'src/app/Utils/dialog';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
 key:string;
 displayLoader=true;
  constructor(private route: ActivatedRoute,public service:ApiService,public router:Router,public dialogService:Dialog) {
    this.route.params.subscribe( params => {console.log(params)
    this.key=params.key
    if(this.key){
      this.confirmEmail();
    }
    });
   }

  ngOnInit(): void {
  }
  confirmEmail(){
    this.service.apiGET("confirm/"+this.key).subscribe((result:any)=>{
        if(result.status==true){
          this.displayLoader=false;
          this.dialogService.showAlert("success", "Success!", "Account varified successfuly! please login");
          this.router.navigate(['/']);
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
