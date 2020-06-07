import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details.component';

const detailsRoutes: Routes = [
  {
    path: '', component: DetailsComponent,
    children: [
      {
        path: 'stock/:id/:type',
        loadChildren: () => import('../../stocksdetail/stocks-detail.module').then(m => m.StocksDetailModule)
      }
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(detailsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DetailsRoutingModule { }