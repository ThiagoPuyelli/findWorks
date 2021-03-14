import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GetWorksService } from "../../services/get-works.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit, AfterViewInit {

  public work: any; 
  public owner: boolean = false;

  constructor(
    private getWorks: GetWorksService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.worksFind();
  }
  
  ngAfterViewInit(): void {
  }

  worksFind(){
    this.route.params.subscribe(
      result => {
        this.getWorks.findWork(result.id).subscribe(
          work => {
            this.work = work;
            const token: any = sessionStorage.getItem("x-access-token");
            if(token){
              const userID: any = token.split("|")[2];
              console.log(userID)
              if(userID == this.work.userID + "") this.owner = true;
            }
          },
          err => console.log(err)
        )
      }
    )
  }

}
