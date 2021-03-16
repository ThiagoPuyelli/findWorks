import { Component, OnInit } from '@angular/core';
import { GetUserService } from "../../services/get-user.service";

@Component({
  selector: 'app-home-auth',
  templateUrl: './home-auth.component.html',
  styleUrls: ['./home-auth.component.css']
})
export class HomeAuthComponent implements OnInit {

  public user: any;

  constructor(
    private getUser: GetUserService
  ) { }

  ngOnInit(): void {
    this.findUser();
  }

  findUser(): void {
    this.getUser.findUser().subscribe(
      result => {
          this.user = result;
          console.log(this.user)
      },
      err => console.log(err)
    )
  }

}
