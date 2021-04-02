import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "../../models/User";
import { RegisterService } from "../../services/register.service";
import { GetUserService } from "../../services/get-user.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit, AfterContentChecked {

  public dataForm: FormGroup;
  public imageFile: File | undefined;
  public userID: string = "";
  public user: any;
  public routeAdmin: boolean = false;
  public owner: boolean = false;

  constructor(
    private builder: FormBuilder,
    private registerService: RegisterService,
    private getUserService: GetUserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.dataForm = this.builder.group({
      name: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
      description: ["", Validators.required]
    })
    this.imageFile = undefined;
   }

  ngOnInit(): void {
    this.route.url.subscribe(
      (result: any) => {
        if(result[0] == "update-user"){
          this.findUser();
          this.routeAdmin = true;
        }
      },
      err => console.log(err)
    )
  }

  ngAfterContentChecked(): void {
    const token: string|null = sessionStorage.getItem("x-access-token");
    if(token && token.split("|")[0] == "0" && token.split("|")[2] == this.userID){
        this.owner = true;
    }
  }

  findUser(){
    this.route.params.subscribe(
      (params: any) => {
        if(params.id){
          this.userID = params.id;
        }
        this.getUserService.findUserPublic(this.userID).subscribe(
          result =>{ 
            this.user = result;
            for(let i in this.user){
              if(i != "_id" && i != "password" && i != "image" && i != "public_id"){
                this.dataForm.get(i)?.setValue(this.user[i]);
              } else if (i == "image"){
                const img: HTMLElement|null = document.querySelector("#contentImage img");
                if(img) img.setAttribute("src", this.user.image);
              }
            }
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
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

        if(this.routeAdmin){
          if(this.owner){
            console.log(userSend)
            this.registerService.updateUserOwner(userSend).subscribe(
              result => this.router.navigate(["/profile/" + this.userID]),
              err => console.log(err)
            )
          } else {
            this.registerService.updateUser(userSend, this.userID).subscribe(
              result => this.router.navigate(["/profile/" + this.userID]),
              err => console.log(err)
            )
          }
        } else {
          this.registerService.registerUser(userSend).subscribe(
            (result: any) => {
              if(result.auth){
                sessionStorage.setItem("x-access-token", result.token);
                location.reload();
              }
            },
            err => {
              console.log(err);
            }
          )
        }

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
      console.log(src)
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
