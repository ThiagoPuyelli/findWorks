import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  constructor(
    private http: HttpClient
  ) { }

  findUser(){
    const token: any = sessionStorage.getItem("x-access-token");
    return this.http.get(environment.uri + "/users/" + token.split("|")[2]);
  }
  
  findUserPublic(id: string){
    return this.http.get(environment.uri + "/users/" + id);
  }

  findUsers(){
    const token: string|null = sessionStorage.getItem("x-access-token");
    if(token && token.split("|")[0] == "1"){
        const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
        return this.http.get(environment.uri + "/users", {headers});
    } else {
      return undefined
    }
  }

  findAdmins() {
    const token: string|null = sessionStorage.getItem("x-access-token");
    if(token && token.split("|")[0] == "1"){
        const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
        return this.http.get(environment.uri + "/admin", {headers});
    } else {
      return undefined
    }
  }

  deleteUser(){
    const token: string|null = sessionStorage.getItem("x-access-token");
    if(token && token.split("|")[0] == "1"){
        const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
        return this.http.delete(environment.uri + "/admin-users", {headers});
    } else {
      return undefined
    }
  }

}
