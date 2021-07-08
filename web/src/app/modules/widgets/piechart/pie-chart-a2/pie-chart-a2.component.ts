import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { PieChart } from "../../../../data";
import {
  PieChartA2ItemDataModel,
  PieChartA2Model,
  PieChartA2ConfigModel
} from "./pie-chart-a2-model";
import { ColorHelper } from "@swimlane/ngx-charts";
import { ServerApiInterfaceServiceService } from "src/app/server-api-interface-service.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ErrorCodes } from "src/app/models/common/error-codes";
import { WidgetConstants } from "../../../widget-utility/widget-constants";

declare var $: any;

@Component({
  selector: "app-pie-chart-a2",
  templateUrl: "./pie-chart-a2.component.html",
  styleUrls: ["./pie-chart-a2.component.css"]
})
export class PieChartA2Component implements OnInit {
  @Input() dataModel: PieChartA2Model;
  @Input() configModel: PieChartA2ConfigModel;
count:any;
 

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _toastnotificationservice: ToastrService, //TODO: This service need remove from this and place at common place
    private router: Router
  ) {
    //  Object.assign(this, { single });
  }

  ngOnInit() {
    this.configModel.CompToCaller.addListener(
      WidgetConstants.CALLER_TO_COMP_REFRESH_DATA,
      () => {
        this.RefreshData();
      }
    );
  }






  InitComponent() {
    if (this.dataModel.isSelfDataLoad) {
      this.RefreshData();
    }
    //this.changetext();
  }

  RefreshData() {
    this.getApiData();
  }

  getApiData() {
    const apiUrlConst = this.dataModel.apiDataUrl;

    let reqData = Object();
    reqData.data = Object();
    reqData.data.id = this.dataModel.widgetinstanceid;

    this._serverApi.post<any, any>(apiUrlConst, reqData.data).subscribe(
      response => {
        if (response) {
          let temData = [];

          this.convertData(response);
        }
      },
      error => {
        // TODO: this code need to move in common place
        switch (error.code) {
          case ErrorCodes.INVALID_USER_ACCESS:
            this._toastnotificationservice.error("Invalid User Access");
            break;
        }
      }
    );
  }



  ngAfterViewInit() {
    // (document.querySelector('.chart-legend:nth-child(2) .horizontal-legend:nth-child(2) li:nth-child(2)') as HTMLElement).style.display = 'block';
    // (document.querySelector('#pie .chart-legend .horizontal-legend li:nth-child(3)') as HTMLElement).style.display = 'block';
    // (document.querySelector('#pie .chart-legend .horizontal-legend li:nth-child(4)') as HTMLElement).style.display = 'block';
    // (document.querySelector('#pie .chart-legend .horizontal-legend li:nth-child(1)') as HTMLElement).style.display = 'block';
    // (document.querySelector('#pie .chart-legend .horizontal-legend li:nth-child(2)') as HTMLElement).style.display = 'block';
    //var txt1 = "<span style='float:right;text-align:right;padding-right:15px;'>20% </b>";  



    setTimeout(() => {    //<<<---    using ()=> syntax
      $(".pie .legend-label-text").css("width", "calc(100% - 100px)");

      $(".pie .legend-label-text").text(function (index) {


        // console.log("item", index + 1);
        var tax2 = $(this).text();
        // alert(tax2);

        var x = tax2.length - 4;
        var res = tax2.slice(0, x);

        $(this).text(res);
        var res1 = tax2.slice(x, tax2.length);


        //alert(res1);
        var txt1 = "<span style='float:right;font-weight:700;text-align:right;padding-right:15px;'>" + res1 + " </b>";
        $(this).after(txt1);
      });

    }, 500);
    // $(".pie .legend-label-text").css("width", "calc(100% - 100px)");












    //$(".pie .legend-label-text").after(txt1); 

  }

  convertData(response) {
    let totalvalue = 0;
    let temData = [];
    this.count=response.count;
    if(response?.data &&  response.data.length > 0){
    response.data.forEach(responsePieItem => {
      totalvalue = totalvalue + responsePieItem.itemcount;
    });
    response.data.forEach(responsePieItem => {
      let item = new PieChartA2ItemDataModel();
      item.code = responsePieItem.code;
      item.name = responsePieItem.name;

      item.value = responsePieItem.itemcount;
      item.extra = {};
      item.extra.displayName = item.name;
      let x = (item.value / totalvalue) * 100;
      item.extra.displayValue = " " + x + "%";
      temData.push(item);
    });
  }
    this.dataModel.items = temData;
    this.dataModel.totalCount = response.count;

    let datatitles = temData.map(d => d["extra"]["displayName"]);
    this.dataModel.datatitle = datatitles;
    this.dataModel.legendData = temData.map(
      d => d["extra"]["displayName"] + d['extra']['displayValue']
    );

    // this.dataModel.legendColor = new ColorHelper(
    //   this.colorScheme2,
    //   "ordinal",
    //   this.dataModel.items,
    //   this.colorScheme
    // );
  }

  unselected() {
    $(".pie li").css("color", "#afb7c8");
  }

  selected(event) {
    var a = this.dataModel.datatitle.indexOf(event.name);
    a++;

    $(".pie li:nth-child(" + a + ")")
      .css("color", "#000")
      .hover(
        function () {
          $(this).addClass("sogreen");
        },
        function () {
          $(this).removeClass("sogreen");
        }
      );
  }

  public legendLabelActivate(item: any): void {
    var x = item.name.length - 4;
    var res = item.name.slice(0, x);
    item.name = res;
    this.dataModel.activeEntries = [item];
  }

  public legendLabelDeactivate(item: any): void {
    this.dataModel.activeEntries = [];
  }
}
