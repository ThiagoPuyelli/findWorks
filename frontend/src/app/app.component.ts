import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { VerifyAuthService } from "./services/verify-auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked{
  public auth: boolean;
  public admin: boolean;
  public id: string|null|undefined;
  constructor(
    private verifyAuth: VerifyAuthService
    ){
      this.auth = false;
      this.admin = false;
    };
    
    ngOnInit(): void {
    }
    
    ngAfterContentChecked(): void {
    if(this.verifyAuth.auth) {
      this.auth = true;
      this.id = sessionStorage.getItem("x-access-token")?.split("|")[2];
      if(sessionStorage.getItem("x-access-token")?.split("|")[0] == "1") this.admin = true;
    };
    }

    logout(){
      sessionStorage.removeItem("x-access-token");
      location.reload();
    }

}
