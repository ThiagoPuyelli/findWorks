import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ModifyAdminService {

  constructor(
    private http: HttpClient
  ) { }

  updateEmail(body: any, id: string) {
    const token: string|null = sessionStorage.getItem("x-access-token");
    if(token && token.split("|")[0] == "1"){
      const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
      return this.http.put(environment.uri + "/admin-email/" + id, body, {headers});
    } else {
      return this.http.put(environment.uri + "/admin-email/" + id, body);
    }
  }

  updatePassword(body: any, id: string) {
    const token: string|null = sessionStorage.getItem("x-access-token");
    if(token && token.split("|")[0] == "1"){
      const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
      return this.http.put(environment.uri + "/admin-password/" + id, body, {headers});
    } else {
      return this.http.put(environment.uri + "/admin-password/" + id, body);
    }
  }

}
