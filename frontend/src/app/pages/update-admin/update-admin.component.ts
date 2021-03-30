import { Component, OnInit } from '@angular/core';
import { GetUserService } from "../../services/get-user.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {

  public dataEmail: FormControl = new FormControl("", [Validators.required, Validators.email]);
  public dataPassword: FormControl = new FormControl("", [Validators.required, Validators.minLength(4)]);
  public data: string = "";

  constructor(
    private route: ActivatedRoute,
    private getUser: GetUserService
  ) { }

  ngOnInit(): void {
    this.findData();
  }

  findData(){
    this.route.params.subscribe(
      params => {
        this.data = params.data;
        this.getUser.findAdmin(params.id).subscribe(
          (admin: any) => {
            if(this.data == "email"){
              this.dataEmail.setValue(admin.email);
            }
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
  }

  changeInput(event: any, data: string){
    if(data == "email") this.dataEmail.setValue(event.target.value);
  }

}
