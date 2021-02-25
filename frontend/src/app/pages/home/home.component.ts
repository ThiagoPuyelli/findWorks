import { Component, OnInit } from '@angular/core';
import { VerifyAuthService } from "../../services/verify-auth.service";
import { GetCategoriesService } from "../../services/get-categories.service";
import { GetWorksService } from "../../services/get-works.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public auth: boolean;
  public categories: Array<string>;
  public works: Array<any>;

  constructor(
    private verifyAuth: VerifyAuthService,
    private getCategories: GetCategoriesService,
    private getWorks: GetWorksService
  ) {
    this.auth = false;
    if(this.verifyAuth.auth){
      this.auth = true;
    }
    this.categories = [];
    this.works = [];
   }

  ngOnInit(): void {
    this.findCategories();
    this.findWorks();
  }

  findWorks(){
    this.getWorks.findWorks().subscribe(
      (result: any) => {
        for(let i of result){
          this.works.push(i);
        }
        console.log(this.works)
      },
      err => {
        console.log(err);
      }
    )
  }

  findCategories(){
    this.getCategories.findCategories().subscribe(
      (result: any) => {
        for(let i in result){
          this.categories.push(result[i].categorie)
        }
      },
      err => {
        console.log(err);
      }
    )
  }

}
