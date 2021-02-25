import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { VerifyAuthService } from "./services/verify-auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked{
  public auth: boolean;
  constructor(
    private verifyAuth: VerifyAuthService
    ){
      this.auth = false;
    };
    
    ngOnInit(): void {
    }
    
    ngAfterContentChecked(): void {
    if(this.verifyAuth.auth) this.auth = true;
    }

    logout(){
      sessionStorage.removeItem("x-access-token");
      location.reload();
    }

}
