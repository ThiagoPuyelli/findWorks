import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public dataForm: FormGroup

  constructor(
    private builder: FormBuilder,
    private loginService: LoginService
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
      this.loginService.login(this.dataForm.value).subscribe(
        (result: any) => {
          if(!result.auth){
            const msgNoAuth: any = document.querySelector(".noAuth");
            msgNoAuth.style.display = "block";
          } else {
            console.log(result)
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
