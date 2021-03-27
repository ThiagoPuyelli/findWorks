import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  public dataForm: FormGroup

  constructor(
    private builder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.dataForm = this.builder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(4)]]
    })
   }

  ngOnInit(): void {
  }

  sendLogin(){
    event?.preventDefault();
    const msgError: any = document.querySelector(".failed");

    if(this.dataForm.status == "VALID"){
      msgError.style.display = "none";
      this.loginService.loginAdmin(this.dataForm.value).subscribe(
        (result: any) => {
          if(!result.auth){
            const msgNoAuth: any = document.querySelector(".noAuth");
            msgNoAuth.style.display = "block";
          } else {
            sessionStorage.setItem("x-access-token", result.token);
            location.reload();
          }
        },
        err => {
          console.log(err);
        }
      )
    } else {
      msgError.style.display = "block";
    }
  }

}