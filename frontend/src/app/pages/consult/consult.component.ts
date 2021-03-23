import { Component, OnInit } from '@angular/core';
import { ConsultsService } from "../../services/consults.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit {

  public consult: any;

  constructor(
    private consultsService: ConsultsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getConsult();
  }

  getConsult(){
    this.route.params.subscribe(
      result => {
        if(result.id){
          this.consultsService.getConsult(result.id).subscribe(
            (consult: any) => {
              this.consult = consult;
              console.log(this.consult);
            },
            (err: any) => console.log(err)
          )
        }
      }
    )
  }

}
