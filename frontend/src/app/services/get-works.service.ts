import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GetWorksService {

  constructor(
    private http: HttpClient
  ) { }

  findWorks(index: number){
      return this.http.get(environment.uri + "/works/" + index);
  }

  findWork(id: string){
    return this.http.get(environment.uri + "/works-id/" + id);
  }

  findPages(){
    return this.http.get(environment.uri + "/pages");
  }

  findWorksCategory(category: string, index: number){
    return this.http.get(environment.uri + "/works-categories/" + category + "/" + index);
  }

  findPagesCategory(category: string){
    return this.http.get(environment.uri + "/pages/" + category);
  }

  findWorksUser(){
    const token: any = sessionStorage.getItem("x-access-token")
    let headers = new HttpHeaders().set("x-access-token", token);
    return this.http.get(environment.uri + "/works-user", {headers})
  }
  
}
