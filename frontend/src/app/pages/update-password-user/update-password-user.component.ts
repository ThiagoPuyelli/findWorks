import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { RegisterService } from "../../services/register.service"; 
import { Router } from "@angular/router";

@Component({
  selector: 'app-update-password-user',
  templateUrl: './update-password-user.component.html',
  styleUrls: ['./update-password-user.component.css']
})
export class UpdatePasswordUserComponent implements OnInit {

  private userID: string = "";
  public dataForm: FormGroup = this.builder.group({
    password: ["", [Validators.required, Validators.minLength(4)]],
    confirmPassword: ["", [Validators.required, Validators.minLength(4)]]
  });

  constructor(
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findUserId();
  }

  findUserId(){
    this.route.params.subscribe(
      (params: any) => {
        if(params.id) this.userID = params.id;
      }
    )
  }

  submitPassword(){
    if(this.dataForm.status == "VALID" && this.dataForm.value.password == this.dataForm.value.confirmPassword){
      const token: null|string = sessionStorage.getItem("x-access-token");
      if(token && token.split("|")[0] == "1"){
        this.registerService.adminUpdatePasswordUser({password: this.dataForm.value.password}, this.userID).subscribe(
          result => this.router.navigate(["/profile/" + this.userID]),
          err => console.log(err)
        )
      } else {
        this.registerService.updatePasswordUserOwner({password: this.dataForm.value.password}).subscribe(
          result => this.router.navigate(["/"]),
          err => console.log(err)
        )
      }
    } else if(this.dataForm.status == "VALID" && this.dataForm.value.password != this.dataForm.value.confirmPassword) {
      let span: HTMLElement|null = document.querySelector(".msgError.different");
      if(span)span.style.display = "block";
    } else {
      let span: HTMLElement|null = document.querySelector(".msgError.required");
      if(span) span.style.display = "block";
    }
  }

  changeInput(id: string){
    const control: AbstractControl|null = this.dataForm.get(id);
    var span: HTMLElement|null = document.querySelector(".msgError.required");
    var input: HTMLElement|null = document.querySelector("#" + id + "Input");
    if(control && control.status == "VALID"){
        if(span) span.style.display = "none";
        if(input) {
          input.style.border = "1px solid green";
          input.style.boxShadow = "0px 0px 3px green";
        };
    } else if(control && control.status == "INVALID"){
        if(span) span.style.display = "block";
        if(input) {
          input.style.border = "1px solid red";
          input.style.boxShadow = "0px 0px 3px red";
        };
    }
  }

}
