import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StocksService } from '../../core/services/stocks.service';
import { StocksModel, EarningsList, Earnings } from '../../core/services/stocks.model';
import { RouterModule, Router } from '@angular/router';


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.css']
})
export class EarningsComponent implements OnInit {


  earningsData: Earnings[];

  displayedColumns = [
  "symbol",
  "numberOfEstimates",
  "consensusEPS",
  "quote.open",
  "quote.latestPrice",
  "quote.high",
  "quote.low",
  "quote.avgTotalVolume"
];

  dataSourceAmc: MatTableDataSource<Earnings>;
  dataSourceBto: MatTableDataSource<Earnings>;
  showDetails: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private stocksService: StocksService, private route: Router) {
    stocksService.getEarnings().subscribe(response => {
      //this.earningsData = response.amc;
      this.dataSourceAmc = new MatTableDataSource(response.amc);
      this.dataSourceAmc.paginator = this.paginator;
      this.dataSourceAmc.sort = this.sort;

      this.dataSourceBto= new MatTableDataSource(response.bto);
      this.dataSourceBto.paginator = this.paginator;
      this.dataSourceBto.sort = this.sort;

    })
  }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }


  selectRow(row: Earnings) {
    this.showDetails = true;
    //this.stocksService.gainerOrLosers.next("GAINER");
    //this.stocksService.earningDetail.next(row);
    this.route.navigate(['home/details/stock', row.symbol, 'EARNING']);
    //this.stockDetail = row;
    //this.isGainer = true;
  }
}



/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */