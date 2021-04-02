import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms"; 

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
    private builder: FormBuilder
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
    }
  }

}
