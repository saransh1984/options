import { Component, OnInit, ViewChild, Input, OnDestroy, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StocksModel, StockDetail, ChartModel, HighLowData } from '../core/services/stocks.model';
import { StocksService } from '../core/services/stocks.service';
import { ActivatedRoute, Router, Route, ParamMap, NavigationEnd } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { StockChart } from 'angular-highcharts';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StocksVolumeWarning } from './stocks-volume-warning';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';


export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-stocks-detail',
  templateUrl: './stocks-detail.componentcopy.html',
  styleUrls: ['./stocks-detail.component.css']
})
export class StocksDetailComponent implements OnInit, OnDestroy {

  stockDetail: StockDetail;
  isGainer: boolean;
  stockSymbol: string;
  stockType: string;
  isShow = false;
  panelOpenState: boolean = false;
  stock: StockChart;
  inputField: string;
  csvData: any[] = [];
  isShowChart = false;
  yesterdayValue: HighLowData[] = [];
  highLowDataList: HighLowData[] = [];
  highValues: HighLowData[] = [];
  lowValues: HighLowData[] = [];
  lowDifferenceSummed: number = 0;
  highDifferenceSummed: number = 0;
  low22DaysDifferenceSummed: number = 0;
  high22DaysDifferenceSummed: number = 0;
  enterValue: number = 0;
  enterPercent: number = 7;
  enterNegValue: number = 0;
  enterNegPercent: number = 5;
  enterStrikePrice: number;
  enterVoltality: number = 35;
  enterInterest: number = 5;
  //enterTermInmonths: Date = new Date();
  blackScholesPutResult: number;
  blackScholesCallResult: number;
  enterCallStrikePrice: number;
  enterCallVoltality: number = 35;
  enterCallInterest: number = 5;
  enterCallTermInmonths: Date = new Date();
  isShowGainers = true;
  days: number;
  /*enterCallValueDate: Date = new Date();
  enterCallExpDate: Date = new Date();
  enterPutExpDate: Date = new Date();
  enterPutValueDate: Date = new Date();*/
  minDate: Date = new Date();
  enterPutStockPrice: number;
  enterCallStockPrice: number;
  enterExpDate: Date = new Date();
  enterValueDate: Date = new Date();
  navigationSubscription;




  constructor(private stocksService: StocksService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog, config: NgbAccordionConfig) {

    config.type = "dark";
    config.closeOthers = true;
    stocksService.gainerOrLosers.subscribe(data => {
      alert("stock Details");
      this.isShowGainers = (data === "GAINER") ? true : false;
    });
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.highValues = [];
        this.lowValues = [];
        this.lowDifferenceSummed = 0;
        this.highDifferenceSummed = 0;
        this.low22DaysDifferenceSummed = 0;
        this.high22DaysDifferenceSummed = 0;
        this.enterCallStockPrice = 0;
        this.enterPutStockPrice = 0;
        this.isShowGainers = (this.stockType === "GAINER") ? true : false;
        this.getDetails(this.stockSymbol);

      }
    });

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(StocksVolumeWarning, {
      width: '250px',
      data: { name: 'Dont Buy' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  modifyCallStockPrice(data: number) {
    this.enterCallStockPrice = data;
  }

  private getDetails(id: string) {
    if (this.stocksService.getDetails(id) != undefined) {
      this.stocksService.getDetails(id).subscribe((response: StockDetail) => {
        console.log(response);
        this.isShow = true;
        this.stockDetail = response;
        this.setChartsDetails(this.stockDetail);
        if (response.quote.avgTotalVolume < 400000) {
          this.openDialog();
        }
      });
    }
  }
  ngOnInit() {
    this.route.paramMap.forEach((params: ParamMap) => {
      this.highValues = [];
      this.lowValues = [];
      this.lowDifferenceSummed = 0;
      this.highDifferenceSummed = 0;
      this.low22DaysDifferenceSummed = 0;
      this.high22DaysDifferenceSummed = 0;
      this.enterCallStockPrice = 0;
      this.enterPutStockPrice = 0;
      this.stockSymbol = params.get('id');
      this.stockType = params.get('type');
      this.isShowGainers = (this.stockType === "GAINER") ? true : false;
      this.getDetails(this.stockSymbol);
    });
  }

  public showChart() {
    if (this.isShowChart) {
      this.isShowChart = false;
    }
    else {
      this.isShowChart = true;
    }

  }

  public fetchDetails(symbol: string) {
    this.getDetails(symbol);
  }


  setChartsDetails(res: StockDetail) {
    this.highValues = [];
    this.lowValues = [];
    let chartDetails = new Array();
    let previousClose: number = null;
    this.enterCallStockPrice = res.quote.latestPrice;
    this.enterPutStockPrice = res.quote.latestPrice;
    for (let chartDtl of res.chart) {
      const date = new Date(chartDtl.date);
      chartDetails.push([date.getTime(), chartDtl.high]);
      let highLowData: HighLowData = new HighLowData();
      highLowData.highValue = chartDtl.high;
      highLowData.lowValue = chartDtl.low;
      highLowData.date = chartDtl.date;
      if (previousClose != null) {
        highLowData.highDifference = highLowData.highValue - previousClose;
        highLowData.lowDifference = highLowData.lowValue - previousClose;
      }
      highLowData.previousClose = previousClose;
      previousClose = chartDtl.close;
      this.highValues.push(highLowData);
      this.lowValues.push(highLowData);

    }
    this.lowValues = this.lowValues.sort(function (a, b) {
      return a.lowDifference - b.lowDifference;
    })

    this.highValues = this.highValues.sort(function (a, b) {
      return a.highDifference - b.highDifference;
    })

    //For 22 Days
    let top22HighValues: HighLowData[] = this.highValues.slice(this.highValues.length - 22, this.highValues.length).reverse();
    let top22LowValues: HighLowData[] = this.lowValues = this.lowValues.slice(1, 23);

    top22LowValues.forEach(data => {
      this.low22DaysDifferenceSummed += data.lowDifference;
    })


    top22HighValues.forEach(data => {
      this.high22DaysDifferenceSummed += data.highDifference;
    })

    //For 5 Top High

    this.highValues = this.highValues.slice(this.highValues.length - 5, this.highValues.length).reverse();
    this.lowValues = this.lowValues.slice(1, 6);

    this.lowValues.forEach(data => {
      this.lowDifferenceSummed += data.lowDifference;
    })


    this.highValues.forEach(data => {
      this.highDifferenceSummed += data.highDifference;
    })

    this.stock = new StockChart({
      rangeSelector: {
        selected: 1
      },
      title: {
        text: res.quote.symbol + 'Stock Price'
      },
      series: [{
        name: res.quote.symbol,
        data: chartDetails
      }]
    });

  }

  days_of_a_year(year) {

    return this.isLeapYear(year) ? 366 : 365;
  }

  isLeapYear(year) {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }
  days_between(date1: Date, date2: Date) {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms)

    // Convert back to days and return
    return Math.round(difference_ms / ONE_DAY)

  }

  public enterHighValue(val: number) {
    this.enterValue = Number(val.toPrecision(2));
  }

  public enterLowValue(val: number) {
    this.enterNegValue = Number(val.toPrecision(2)) * (-1);
  }


  public putBlackScholes() {
    this.days = this.days_between(this.enterExpDate, this.enterValueDate);
    console.log(this.days + '>>' + (this.days_of_a_year(new Date().getFullYear)));
    this.blackScholesPutResult = this.stocksService.getScholasPutCalc(this.enterPutStockPrice,
      this.enterStrikePrice, this.enterInterest, this.enterVoltality, this.days / (this.days_of_a_year(new Date().getFullYear)));
  }
  public callBlackScholes() {
    this.days = this.days_between(this.enterExpDate, this.enterValueDate);
    console.log(this.days + '>>' + (this.days_of_a_year(new Date().getFullYear)));
    this.blackScholesCallResult = this.stocksService.getScholasCallCalc(
      this.enterCallStockPrice, this.enterCallStrikePrice, this.enterCallInterest, this.enterCallVoltality, this.days / (this.days_of_a_year(new Date().getFullYear)));
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  private extractData(res: Response) {

    let csvData = res['_body'] || '';
    let allTextLines = csvData.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');
    let lines = [];

    for (let i = 0; i < allTextLines.length; i++) {
      // split content based on comma
      let data = allTextLines[i].split(',');
      if (data.length == headers.length) {
        let tarr = [];
        for (let j = 0; j < headers.length; j++) {
          tarr.push(data[j]);
        }
        lines.push(tarr);
      }
    }
    this.csvData = lines;
  }
}

