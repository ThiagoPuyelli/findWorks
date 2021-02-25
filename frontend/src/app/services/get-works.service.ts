import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GetWorksService {

  constructor(
    private http: HttpClient
  ) { }

  findWorks(){
      return this.http.get(environment.uri + "/works");
  }
  
}
