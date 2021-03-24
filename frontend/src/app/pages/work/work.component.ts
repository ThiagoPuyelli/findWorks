import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GetWorksService } from "../../services/get-works.service";
import { GetUserService } from "../../services/get-user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ModifyWorksService } from "../../services/modify-works.service";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit, AfterViewInit {

  public work: any; 
  public owner: boolean = false;
  public workID: string = "";
  public formConsult: boolean = false;
  public user: any;

  constructor(
    private getWorks: GetWorksService,
    private route: ActivatedRoute,
    private modifyWorks: ModifyWorksService,
    private getUserService: GetUserService,
    private router: Router
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
            console.log(this.work)
            this.getUser(this.work.userID);
            this.workID = result.id;
            const token: any = sessionStorage.getItem("x-access-token");
            if(token){
              const userID: any = token.split("|")[2];
              if(userID == this.work.userID + "") this.owner = true;
            }
          },
          err => console.log(err)
        )
      }
    )
  }

  getUser(id: string){
      this.getUserService.findUserPublic(id).subscribe(
        result => {
          this.user = result;
        },
        err => {
          console.log(err);
        }
      )
  }

  deleteWork(){
    this.modifyWorks.deleteWork(this.workID).subscribe(
      result => {
        this.router.navigate(["/works-user"]);
      },
      err => console.log(err)
    )
  }

  displayForm(){
    this.formConsult = true;
  }

}
