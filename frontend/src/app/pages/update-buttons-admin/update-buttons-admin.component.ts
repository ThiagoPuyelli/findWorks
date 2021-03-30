import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-update-buttons-admin',
  templateUrl: './update-buttons-admin.component.html',
  styleUrls: ['./update-buttons-admin.component.css']
})
export class UpdateButtonsAdminComponent implements OnInit {

  public userID: string = "";

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => this.userID = params.id,
      err => console.log(err)
    )
  }

}
