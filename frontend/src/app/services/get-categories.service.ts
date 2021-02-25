import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GetCategoriesService {

  constructor(
    private http: HttpClient
  ) { }

  findCategories(){
    return this.http.get(environment.uri + "/categories");
  }
  
}
