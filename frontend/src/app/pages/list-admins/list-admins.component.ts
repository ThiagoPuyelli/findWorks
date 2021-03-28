import { Component, OnInit } from '@angular/core';
import { GetUserService } from "../../services/get-user.service";

@Component({
  selector: 'app-list-admins',
  templateUrl: './list-admins.component.html',
  styleUrls: ['./list-admins.component.css']
})
export class ListAdminsComponent implements OnInit {

  public admins: any;

  constructor(
    private getUserService: GetUserService
  ) { }

  ngOnInit(): void {
    this.findAdmins();
    setTimeout(() => console.log(this.admins), 300)
  }

  findAdmins() {
    this.getUserService.findAdmins()?.subscribe(
      result => this.admins = result,
      err => console.log(err)
    )
  }

}
