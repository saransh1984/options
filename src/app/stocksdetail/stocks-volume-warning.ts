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
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'dialog-overview-dialog',
  templateUrl: 'dialog-overview-dialog.html',
})
export class StocksVolumeWarning {

  constructor(
    public dialogRef: MatDialogRef<StocksVolumeWarning>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
