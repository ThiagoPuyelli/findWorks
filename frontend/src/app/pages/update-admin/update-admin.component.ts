import { Component, OnInit } from '@angular/core';
import { GetUserService } from "../../services/get-user.service";
import { ActivatedRoute } from "@angular/router";
import { Validators, FormControl } from "@angular/forms";
import { ModifyAdminService } from "../../services/modify-admin.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {

  public dataEmail: FormControl = new FormControl("", [Validators.required, Validators.email]);
  public dataPassword: FormControl = new FormControl("", [Validators.required, Validators.minLength(4)]);
  public postEmail: string = "";
  public postPassword: string = "";
  public data: string = "";
  public userID: string = "";

  constructor(
    private route: ActivatedRoute,
    private getUser: GetUserService,
    private modifyAdmin: ModifyAdminService,
    private router: Router
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
            this.userID = admin._id;
            if(this.data == "email"){
              this.postEmail = admin.email;
            }
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
  }

  changeInputEmail(){
    let emailInput: any = document.querySelector("#emailInput");
    this.dataEmail.setValue(emailInput.value);
    let msgError: HTMLElement|null = document.querySelector(".msgError");
    if(this.dataEmail.status == "INVALID" && emailInput && msgError){
      emailInput.style.border = "1px solid red";
      emailInput.style.boxShadow = "0px 0px 3px red";
      msgError.style.display = "block";
    } else if(this.dataEmail.status == "VALID" && emailInput && msgError){
      emailInput.style.border = "1px solid lightgreen";
      emailInput.style.boxShadow = "0px 0px 3px lightgreen";
      msgError.style.display = "none";
    }
  }

  sendData(){
    if(this.dataEmail.status == "VALID"){
      this.modifyAdmin.updateEmail({
        email: this.dataEmail.value,
        postEmail: this.postEmail
      }, this.userID).subscribe(
        result => this.router.navigate(["/list-admins"]),
        err => console.log(err)
      )
    } else {
      console.log(typeof this.dataEmail.value)
      this.changeInputEmail();
    }
  }

}
