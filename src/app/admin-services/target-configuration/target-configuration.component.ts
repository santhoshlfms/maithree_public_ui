import { Component, OnInit } from '@angular/core';
import {AppService} from '../../services/app-services'
import {ReportService} from '../../services/report/report.service'
import * as moment from 'moment';

@Component({
  selector: 'app-target-configuration',
  templateUrl: './target-configuration.component.html',
  styleUrls: ['./target-configuration.component.css']
})
export class TargetConfigurationComponent implements OnInit {

  constructor(private service: AppService, private reportService : ReportService) { }

  branches=[];
  selectedBranch="";
  productList = [];
  dataList:any;
  monthList=[];
  selectedMonth = ""

  ngOnInit() {
    this.getListOfBranches();
    this.getMonth();
   // this.getListOfProducts(null);
  }

  getMonth(){
    this.monthList = this.reportService.monthNames;
  }

  getListOfBranches() {
    this.service.getBranches().subscribe((branches : any) => {
      this.branches = branches;
    })
  }

  getListOfProducts(d) {
    console.log(d);
     var date = moment(new Date()).startOf('year').add(d, 'months').format("YYYY-MM-DD HH:mm:ss")
    if(!d) {
      date = moment(new Date()).startOf('month').format("YYYY-MM-DD HH:mm:ss")
    }
    console.log(date);
    this.service.getProductList(date).subscribe((products : any) => {
      for(let i in products){
        products[i].data = new Array(this.branches.length);
      }
      this.productList = products;
    })
  }



  getProductsAgainstBranch(id: string) {
    this.service.getProductListForBranch(id).subscribe((products : any) => {
      this.productList = products;
    })
  }

  updateTarget() {
    console.log("Update target")

  }



}