import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
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

}
