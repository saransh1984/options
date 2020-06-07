import {Component, OnInit, ViewChild} from '@angular/core';
import { StocksService } from '../../core/services/stocks.service';
import { StocksModel } from '../../core/services/stocks.model';
import { RouterModule, Router }    from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
}