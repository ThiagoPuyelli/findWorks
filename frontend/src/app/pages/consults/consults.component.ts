import { Component, OnInit } from '@angular/core';
import { ConsultsService } from "../../services/consults.service";

@Component({
  selector: 'app-consults',
  templateUrl: './consults.component.html',
  styleUrls: ['./consults.component.css']
})
export class ConsultsComponent implements OnInit {

  public consults: Array<any> = [];

  constructor(
    private consultsService: ConsultsService
  ) { }

  ngOnInit(): void {
    this.getConsults();
  }

  getConsults(){
    this.consultsService.getConsults().subscribe(
      (result: any) => {
        this.consults = result;
        console.log(this.consults)
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

}
