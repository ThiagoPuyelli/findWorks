import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConsultsService } from "../../services/consults.service";

@Component({
  selector: 'app-send-consult',
  templateUrl: './send-consult.component.html',
  styleUrls: ['./send-consult.component.css']
})
export class SendConsultComponent implements OnInit {

  @Input() workID: any;
  @Input() userID: any;
  public dataForm: FormGroup;
  public verifySend: boolean = false;

  constructor(
    private builder: FormBuilder,
    private consultsService: ConsultsService
  ) {
    this.dataForm = this.builder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", Validators.email],
      otherTitle: [""],
      otherData: [""],
      otherDatas: [[]]
    }) 
   }

  ngOnInit(): void {
  }

  pushOtherData(){
    var { otherTitle, otherData, otherDatas } = this.dataForm.value;
    if(otherTitle != "" || otherData != ""){
      const newDatas = otherDatas.push({title: otherTitle, data: otherData})
      this.dataForm.get("otherTitle")?.setValue("");
      this.dataForm.get("otherData")?.setValue("");
    }
  }

  submitConsult(){
    if(this.dataForm.status == "VALID"){
      const { email, description, title, otherDatas, phone } = this.dataForm.value;
      const dataSend = {
        email,
        description,
        title,
        otherData: otherDatas,
        phone
      };
      this.consultsService.sendConsult(this.userID, this.workID, dataSend).subscribe(
        result => {
          this.verifySend = true
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  deleteRequeriment(title: string, data: string){
    if(title != "" && data != "") {
      const value = this.dataForm.value;
      for(let i in this.dataForm.value.otherDatas){
          if(value.otherDatas[i].title = title && value.otherDatas[i].data == data) {
            value.otherDatas.splice(i, 1);
          }
      }
    }
  }

}
