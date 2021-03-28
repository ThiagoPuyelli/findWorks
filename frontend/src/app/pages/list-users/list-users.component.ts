import { Component, OnInit } from '@angular/core';
import { GetUserService } from "../../services/get-user.service";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  public users: any;

  constructor(
    private getUser: GetUserService
  ) { }

  ngOnInit(): void {
    this.findUsers();
    setTimeout(() => console.log(this.users), 300)
  }

  findUsers(){
    this.getUser.findUsers()?.subscribe(
      users => this.users = users,
      err => console.log(err)
    )
  }

}
