import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { VerifyAuthService } from "../../services/verify-auth.service";
import { GetCategoriesService } from "../../services/get-categories.service";
import { GetWorksService } from "../../services/get-works.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {

  public auth: boolean;
  public admin: boolean;
  public categories: Array<string>;
  public works: Array<any>;
  public page: number|undefined = undefined;
  public pages: Array<number>;
  public category: string|undefined = undefined;
  private categoriesChecked: Array<string>;

  constructor(
    private verifyAuth: VerifyAuthService,
    private getCategories: GetCategoriesService,
    private getWorks: GetWorksService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.auth = false;
    this.pages = [];
    this.categories = [];
    this.works = [];
    this.categoriesChecked = [];
    this.admin = false;
    this.route.params.subscribe(
      result => {
        if(result.page){
          this.page = parseInt(result.page);
        } else {
          this.page = 0;
        }

        if(result.category) this.category = result.category;
      },
      err => {
        console.log(err);
      }
    )
   }

  ngOnInit(): void {
    this.findCategories();
    this.findPages();
  }

  verifyCheckbox(): void {
    if(this.category){
      this.categoriesChecked = this.category.split("-");
      if(this.categoriesChecked){
        for(let i of this.categoriesChecked) {
          const checkbox: any = document.querySelector("#lateral-bar #" + i);
          if(checkbox) checkbox.setAttribute("checked", "");
        }
      } else {
        const checkbox: any = document.querySelector("#lateral-bar #" + this.category);
          if(checkbox) checkbox.setAttribute("checked", "");
      }
  }
  }

  reload(){
    location.reload();
  }
  
  ngAfterViewChecked(): void {
    this.setPageIndex();
    this.verifyCheckbox();
    if(this.verifyAuth.auth){
      this.auth = true;
      const token: string|null = sessionStorage.getItem("x-access-token");
      if(token && token.split("|")[0] == "1"){
        this.admin = true;
      }
    }
  }

  async changeCategory(category: string) {
    if(this.category){
      const categoriesSepared: Array<string>|undefined = this.category.split("-");
      var changeCategory: boolean = false;
      var categorieReal: string = "";
      for(let i of categoriesSepared){
        if(category == i) {
          changeCategory = true;
        } else {
          if(categorieReal == ""){
            categorieReal += i;
          } else {
            categorieReal += "-" + i;
          }
        }
      }
      if(changeCategory){
        if(categorieReal != ""){
          if(this.page == 0){
            await this.router.navigate(["/category/" + categorieReal]);
            await location.reload(); 
          } else {
            await this.router.navigate(["/category-page/" + categorieReal + "/" + this.page]);
            await location.reload();
          }
        } else {
          if(this.page == 0){
            await this.router.navigate(["/"]);
            await location.reload(); 
          } else {
            await this.router.navigate(["/page/" + this.page]);
            await location.reload();
          }
        }
      } else {
        await this.router.navigate(["/category/" + this.category + "-" + category]);
        await location.reload();
      }
    } else {
      await this.router.navigate(["/category/" + category]);
      await location.reload();
    }
  }

  setPageIndex(): void {
      const div: any = document.querySelector(".pageButton.pageButton" + this.page + " .pagePoint");
      if(div) div.style.backgroundColor = "#666";
  }

  findPages(){
    if(!this.category){
      this.getWorks.findPages().subscribe(
        (result: any) => {
          for(let i in result){
            if(result[i] > 0) result[i] /= 10;
          }
          this.pages = result;
        },
        err => {
          console.log(err);
        } 
        )
      } else {
        this.getWorks.findPagesCategory(this.category).subscribe(
          (result: any) => {
            console.log(result)
            for(let i in result){
              if(result[i] > 0) result[i] /= 10;
            }
          this.pages = result;
        },
        err => console.log(err)
      )
    }
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
