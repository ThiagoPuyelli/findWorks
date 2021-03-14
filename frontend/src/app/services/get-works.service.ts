import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observer } from "rxjs";

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
  
}
