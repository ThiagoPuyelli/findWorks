import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GetUserService } from "../../services/get-user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  public user: any;
  public owner: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private getUserService: GetUserService
  ) { }

  ngOnInit(): void {
    this.getUser();
    setTimeout(() => {console.log(this.user)}, 1000)
  }

  getUser(){
    this.route.params.subscribe(
      result => {
          const token: string|null = sessionStorage.getItem("x-access-token");
          if(token){
            const idUser: string = token.split("|")[2];
            if(idUser == result.id){
              this.owner = true;
            }
          }

          this.getUserService.findUserPublic(result.id).subscribe(
            user => this.user = user,
            err => console.log(err)
          )
      },
      err => console.log(err)
    )
  }

}