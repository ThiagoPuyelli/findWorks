import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterService } from "../../services/register.service";

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.css']
})
export class SaveUserComponent implements OnInit {

  public dataForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private registerService: RegisterService
  ) {
    this.dataForm = this.builder.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.minLength(4), Validators.required]]
    });
   }

  ngOnInit(): void {
  }

  changeInput(data: string){
    var span: HTMLElement|null = document.querySelector(".msgError." + data);
    var input: HTMLElement|null = document.querySelector("#" + data);
    if(span && input){
      const status: string = this.dataForm.controls[data].status;
      if(status == "VALID"){
        span.style.display = "none";
        input.style.border = "1px solid lightgreen";
        input.style.boxShadow = "0px 0px 4px lightgreen";
      } else if (status == "INVALID"){
        span.style.display = "block";
        input.style.border = "1px solid red";
        input.style.boxShadow = "0px 0px 4px red";
      }
    }
  }

  submitAdmin(){
    if(this.dataForm.status == "VALID"){
      const token: string|null = sessionStorage.getItem("x-access-token");
      if(token && token.split("|")[0] == "1"){
          this.registerService.saveAdmin(this.dataForm.value).subscribe(
            result => console.log(result), 
            err => console.log(err)
          )
      }
    }
  }

}
