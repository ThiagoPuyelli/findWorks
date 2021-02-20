import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "../../models/User";
import { RegisterService } from "../../services/register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public dataForm: FormGroup;
  public imageFile: File | undefined;

  constructor(
    private builder: FormBuilder,
    private registerService: RegisterService
  ) {
    this.dataForm = this.builder.group({
      name: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required, Validators.minLength(4)]],
      description: ["", Validators.required]
    })
    this.imageFile = undefined;
   }

  ngOnInit(): void {
  }

  changeInput(event: any){
    const typeData: string = event.target.getAttribute("name");

    const msgError: any = document.querySelector(".error" + typeData);
    const input: any = document.querySelector("input[name='" + typeData + "']");
    if(this.dataForm.controls[typeData].status == "INVALID"){
      msgError.style.display = "block";
      input.style.border = "1px solid red";
      input.style.boxShadow = "0px 0px 2px red";
    } else if(this.dataForm.controls[typeData].status == "VALID"){
      msgError.style.display = "none";
      input.style.border = "1px solid green";
      input.style.boxShadow = "0px 0px 2px green";
    }
  }

  submitRegister(){
    if(this.dataForm.status == "VALID"){
      const { name, lastname, description, password, email } = this.dataForm.value;
      const user: User = new User(name, lastname, description, password, email);
      if(user){
        var userSend = { ...this.dataForm.value};
        if(this.imageFile){
          const formData = new FormData();
          for(let i in userSend){
            formData.append(i, userSend[i]);
          }
          formData.append("image", this.imageFile, this.imageFile.name);
          userSend = formData;
        }

        this.registerService.registerUser(userSend).subscribe(
          result => {
            console.log(result);
          },
          err => {
            console.log(err);
          }
        )
      } 
    } else {
      for(let i in this.dataForm.value){
        if(this.dataForm.controls[i].status == "INVALID"){
          const msgError: any = document.querySelector(".error" + i);
          msgError.style.display = "block";
        }
      }
    }
  }

  changeFile(event: any){
    this.imageFile = event.target.files[0];
    const msgError: any = document.querySelector(".errorimage");
    const img: any = document.querySelector("#image");
    const closeImg: any = document.querySelector("#closeImg");
    if(this.imageFile?.type.split("/")[0] != "image"){
      this.imageFile = undefined;
      msgError.style.display = "block";
      img.setAttribute("src", "");
      closeImg.style.display = "none";
    } else {
      msgError.style.display = "none";
      const src = URL.createObjectURL(this.imageFile);
      img.setAttribute("src", src);
      closeImg.style.display = "block";
    }
  }

  closeImg(event: any){
    const img: any = document.querySelector("#image");
    const input: any = document.querySelector("input[type='file']");
    input.value = "";
    this.imageFile = undefined;
    img.setAttribute("src", "");
    event.target.style.display = "none";
  }

}
