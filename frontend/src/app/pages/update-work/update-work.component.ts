import { Component, OnInit } from '@angular/core';
import { GetCategoriesService } from "../../services/get-categories.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Work } from "../../models/Work";
import { ModifyWorksService } from "../../services/modify-works.service";
import { GetWorksService } from "../../services/get-works.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-update-work',
  templateUrl: './update-work.component.html',
  styleUrls: ['./update-work.component.css']
})
export class UpdateWorkComponent implements OnInit {

  public categories: Array<string>
  public requeriments: Array<string> = [];
  public dataForm: FormGroup;
  public imageFile: File|undefined = undefined;
  public work: any = {
    title: "",
    description: "",
    category: "",
    location: "",
    locationwork: "",
    time: ""

  }

  constructor(
    private getCategories: GetCategoriesService,
    private builder: FormBuilder,
    private modifyWorks: ModifyWorksService,
    private router: Router,
    private getWorks: GetWorksService,
    private route: ActivatedRoute
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
    this.getWork();
  }

  getWork(){
    this.route.params.subscribe(
      params => {
          this.getWorks.findWork(params.id).subscribe(
            work => {
              this.work = work;
              if(this.work){
                this.requeriments = this.work.requeriments;
                for(let i in this.work){
                  this.dataForm.get(i)?.setValue(this.work[i]);
                  if(i == "locationwork" || i == "time" || i == "category"){
                    const option = document.querySelector(".selectForm." + i + " option[value='" + this.work[i] + "']");
                    console.log(".selectForm." + i + " option[value='" + this.work[i] + "']")
                  }
                }
              }
            },
            err => console.log(err)
          )
      },
      err => console.log(err)
    )
  }

  deleteRequeriment(requeriment: string){
    for(let i in this.requeriments){
      if(this.requeriments[i] == requeriment) {
        this.requeriments.splice(parseInt(i), 1);
      }
    }
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
      const work = {title, description, category, location, locationwork, time, requeriments: requerimentsString};
      
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
          this.modifyWorks.updateWork(dataSend, this.work._id).subscribe(
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

  changeFile(event: any): void { 
    this.imageFile = event.target.files[0];
    const image: any = document.querySelector("#divImage #imgMoment");
    console.log(image)
    image.setAttribute("src", URL.createObjectURL(this.imageFile))
  }

}
