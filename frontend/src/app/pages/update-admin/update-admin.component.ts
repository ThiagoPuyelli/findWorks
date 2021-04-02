import { Component, OnInit } from '@angular/core';
import { GetUserService } from "../../services/get-user.service";
import { ActivatedRoute } from "@angular/router";
import { Validators, FormControl, FormGroup, AbstractControl } from "@angular/forms";
import { ModifyAdminService } from "../../services/modify-admin.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {

  public dataEmail: FormControl = new FormControl("", [Validators.required, Validators.email]);
  public dataPassword: FormGroup = new FormGroup({
    password: new FormControl("", [Validators.required, Validators.minLength(4)]),
    confirmPassword: new FormControl("", [Validators.required, Validators.minLength(4)])
  });
  public postEmail: string = "";
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

  changeInputPassword(id: string){
    let passwordInput: any = document.querySelector("#" + id);
    console.log(this.dataPassword.get(id))
    const password: AbstractControl|null = this.dataPassword.get("password");
    const confirmPassword: AbstractControl|null = this.dataPassword.get("confirmPassword");
    this.dataPassword.get(id)?.setValue(passwordInput.value);
    let msgError: HTMLElement|null = document.querySelector(".msgError.required");

    if(password && password.status == "INVALID" && passwordInput && msgError){
      passwordInput.style.border = "1px solid red";
      passwordInput.style.boxShadow = "0px 0px 3px red";
      msgError.style.display = "block";
    } else if(password && password.status == "VALID" && passwordInput && msgError){
      passwordInput.style.border = "1px solid lightgreen";
      passwordInput.style.boxShadow = "0px 0px 3px lightgreen";
      msgError.style.display = "none";
    }

    console.log(password, confirmPassword)
    let differentError: HTMLElement|null = document.querySelector(".msgError.different");
    if(password && confirmPassword && password.value == confirmPassword.value){
      if(differentError) differentError.style.display = "none";
    } else {
      if(differentError) differentError.style.display = "block";
    }
  }

  sendDataEmail(){
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

  sendDataPassword(){
    const password: string|null = this.dataPassword.get("password")?.value;
    const confirmPassword: string|null = this.dataPassword.get("confirmPassword")?.value;
    if(this.dataPassword.status == "VALID" && password == confirmPassword){
        this.modifyAdmin.updatePassword({password}, this.userID).subscribe(
          result => this.router.navigate(["/list-admins"]),
          err => console.log(err)
        )
    }
  }

}
