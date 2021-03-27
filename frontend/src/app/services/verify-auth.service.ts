import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VerifyAuthService {

  public auth: boolean;

  constructor(
    private http: HttpClient
  ) {
    this.auth = false;
  
    this.verify();
   }

   verify(): void {
    if(sessionStorage.getItem("x-access-token")){
      const token: any = sessionStorage.getItem("x-access-token");
      if(token && token.split("|")[0] == "0"){
        const headers = new HttpHeaders().set("x-access-token", token);
        this.http.get(environment.uri + "/auth", {headers}).subscribe(
          (result: any) => {
            if(result.auth){
                this.auth = true;
            }
          },
          err => {
            console.log(err);
          }
        );
      } else if(token && token.split("|")[0] == "1"){
        const headers = new HttpHeaders().set("x-access-token", token);
        this.http.get(environment.uri + "/admin/auth", {headers}).subscribe(
          (result: any) => {
            if(result.auth){
                this.auth = true;
            }
          },
          err => {
            console.log(err);
          }
        );
      }
    }
   }
}
