import { Component, OnInit } from '@angular/core';
import { GetCategoriesService } from "../../services/get-categories.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Work } from "../../models/Work";
import { ModifyWorksService } from "../../services/modify-works.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-work',
  templateUrl: './add-work.component.html',
  styleUrls: ['./add-work.component.css']
})
export class AddWorkComponent implements OnInit {

  public categories: Array<string>
  public requeriments: Array<string> = [];
  public dataForm: FormGroup;
  public imageFile: File|undefined = undefined;

  constructor(
    private getCategories: GetCategoriesService,
    private builder: FormBuilder,
    private modifyWorks: ModifyWorksService,
    private router: Router
  ) {
    this.categories = [];
    this.dataForm = this.builder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      category: ["", Validators.required],
      location: ["", Validators.required],
      locationwork: ["", Validators.required],
      time: ["", Validators.required],
      requerimentInput: [""],
      requeriments: [[], Validators.minLength(1)]
    })
   }

  ngOnInit(): void {
    this.findCategories();
  }

  changeInput(clase: string){
    var span: any = document.querySelector(".msgError." + clase);
    var input: any = document.querySelector(".inputForm." + clase);
    if(this.dataForm.controls[clase].status == "INVALID"){
      span.style.display = "block";
      input.style.border = "1px solid red";
      input.style.boxShadow = "0px 0px 3px red";
    } else {
      span.style.display = "none";
      input.style.border = "1px solid green";
      input.style.boxShadow = "0px 0px 4px green"
    };
  }

  findCategories(): void {
    this.getCategories.findCategories().subscribe(
      (result: any) => {
        for(let i of result) this.categories.push(i.categorie);
      },
      err => {
        console.log(err)
      }
    );
  }

  pushRequeriment(): void {
    if(this.dataForm.value.requerimentInput != ""){
      this.requeriments.push(this.dataForm.value.requerimentInput)
      const value: any =  this.requeriments;
      this.dataForm.get("requeriments")?.setValue(value);
      this.dataForm.get("requerimentInput")?.setValue("");
    }
  }

  submitForm(): void {
    if(this.dataForm.status == "VALID"){
      const { title, description, category, location, locationwork, time, requeriments } = this.dataForm.value;
      const requerimentsString = requeriments.join("-");
      const work = {title, description, category, location, locationwork, time, requerimentsString};
      
      if(work) {
        var dataSend;
        if(this.imageFile){
          dataSend = new FormData();

          dataSend.append("image", this.imageFile, this.imageFile.name);

          for(let i in this.dataForm.value){
            if(i != "requerimentInput") dataSend.append(i, this.dataForm.value[i]);
          }
        } else {
          dataSend = work;
        }


        if(dataSend){
          this.modifyWorks.saveWork(dataSend).subscribe(
            result => {
                this.router.navigate(["/works-user"]);
            },
            err => console.log(err)
          )
        }
      }
    } else {
      for(let i in this.dataForm.value){
        console.log(this.dataForm.controls[i].status, i)
        if(this.dataForm.controls[i].status == "INVALID"){
          var span: any = document.querySelector(".msgError." + i);
          var input: any = document.querySelector(".inputForm." + i);
          if(!input) input = document.querySelector(".selectForm." + i);
          if(input) {
            input.style.boxShadow = "0px 0px 4px red";
            input.style.border = "1px solid red";
            span.style.display = "block";
          }
        }
      }
    }
  }

  deleteRequeriment(requeriment: string){
    for(let i in this.requeriments){
      if(this.requeriments[i] == requeriment) {
        this.requeriments.splice(parseInt(i), 1);
      }
    }
  }

  changeFile(event: any): void { 
    this.imageFile = event.target.files[0];
    const image: any = document.querySelector("#divImage #imgMoment");
    console.log(image)
    image.setAttribute("src", URL.createObjectURL(this.imageFile))
  }

}
