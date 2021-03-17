import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ModifyWorksService {

  constructor(
    private http: HttpClient
  ) { }

  saveWork(body: any) {
    const token: any = sessionStorage.getItem("x-access-token");
    let headers = new HttpHeaders().set("x-access-token", token);
    return this.http.post(environment.uri + "/works", body, {headers})
  }

  deleteWork(id: string){
    const token: any = sessionStorage.getItem("x-access-token");
    let headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
    return this.http.delete(environment.uri + "/works/" + id, {headers});
  }

}
