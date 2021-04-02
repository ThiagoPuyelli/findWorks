import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(body: any){
    return this.http.post(environment.uri + "/users/register", body);
  }

  saveAdmin(body: any){
    const token: string|null = sessionStorage.getItem("x-access-token");
    if(token && token.split("|")[0] == "1"){
      const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
      return this.http.post(environment.uri + "/admin", body, {headers});
    } else {
      return this.http.post(environment.uri + "/admin", body);
    }
  }

  updateUser(body: any, id: string){
    const token: string|null = sessionStorage.getItem("x-access-token");
    if(token && token.split("|")[0] == "1"){
      const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
      return this.http.put(environment.uri + "/admin-users/" + id, body, {headers});
    } else {
      return this.http.put(environment.uri + "/admin-users/" + id, body);
    }
  }

  updateUserOwner(body: any){
    const token: string|null = sessionStorage.getItem("x-access-token");
    if(token){
      const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
      return this.http.put(environment.uri + "/users", body, {headers});
    } else {
      return this.http.put(environment.uri + "/users", body);
    }
  }

  updatePasswordUserOwner(body: any) {
    const token: string|null = sessionStorage.getItem("x-access-token");
    if(token){
      const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
      return this.http.put(environment.uri + "/users-password", body, {headers});
    } else {
      return this.http.put(environment.uri + "/users-password", body);
    }
  }

  adminUpdatePasswordUser(body: any, id: string) {
    const token: string|null = sessionStorage.getItem("x-access-token");
    if(token && token.split("|")[0] == "1"){
      const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
      return this.http.put(environment.uri + "/admin-password-user/" + id, body, {headers});
    } else {
      return this.http.put(environment.uri + "/admin-password-user/" + id, body);
    }
  }

}
