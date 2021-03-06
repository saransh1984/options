import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StocksService } from '../../core/services/stocks.service';
import { StocksModel } from '../../core/services/stocks.model';
import { RouterModule, Router }    from '@angular/router';


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-gainers',
  templateUrl: './gainers.component.html',
  styleUrls: ['./gainers.component.css']
})
export class GainersComponent implements OnInit {
  displayedColumns =  ['symbol','open','high','low','latestPrice','latestVolume','iexRealtimePrice','previousClose'
  ,'change','changePercent',/*'iexVolume',*/'avgTotalVolume','marketCap','peRatio','week52High','week52Low'];

  dataSource: MatTableDataSource<StocksModel>;
  showDetails:boolean= false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  gainersData:StocksModel[];

  constructor(private stocksService: StocksService, private route: Router) {
        stocksService.getGainers().subscribe(response => {
        this.gainersData = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
  }

  ngOnInit() {
   // this.dataSource.paginator = this.paginator;
   // this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectRow(row: StocksModel) {
   this.showDetails = true;
   this.stocksService.gainerOrLosers.next("GAINER");
   this.stocksService.stockDetail.next(row);
   this.route.navigate(['home/details/stock', row.symbol, 'GAINER']);
 }
}



/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */