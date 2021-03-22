import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConsultsService {

  constructor(
    private http: HttpClient
  ) { }

  sendConsult(userID: string, workID: string, body: any) {
    return this.http.put(environment.uri + "/consults/" + userID + "/" + workID, body);
  }

  getConsults(): any{
    const token: string|null = sessionStorage.getItem("x-access-token") 
    if(token){
      let headers = new HttpHeaders().set("x-access-token", token);
      return this.http.get(environment.uri + "/consults", {headers});
    }
  }

}
