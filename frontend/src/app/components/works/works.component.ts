import { Component, Input, OnInit } from '@angular/core';
import { GetWorksService } from "../../services/get-works.service";

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {

  @Input() page: any;
  @Input() category: any;

  public works: Array<any>;

  constructor(
    private getWorks: GetWorksService
  ) {
    this.works = [];
   }

  ngOnInit(): void {
    this.findWorks();
  }

  findWorks(){
    if(!this.page){
      this.page = 0;
    }
    if(this.category){
      this.getWorks.findWorksCategory(this.category, this.page).subscribe(
        (result: any) => {
          console.log(result)
          for(let i of result){
            this.works.push(i);
          }
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.getWorks.findWorks(this.page).subscribe(
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
  }

}
