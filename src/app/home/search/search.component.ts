import {Component, OnInit, ViewChild} from '@angular/core';
import { StocksService } from '../../core/services/stocks.service';
import { StocksModel } from '../../core/services/stocks.model';
import { RouterModule, Router }    from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-details',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  stocksCtrl = new FormControl();
  constructor(private route: Router, private stockService: StocksService) {

  }

  public fetchDetails(symbol: string, type: string) {
    //this.stockService.gainerOrLosers.next(type);
    this.getDetails(symbol, type);
  }

  private getDetails(id: string, type: string) {
    this.route.navigate(['home/details/stock', id, type]);
  }
}