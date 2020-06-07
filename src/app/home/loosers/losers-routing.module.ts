import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoosersComponent } from './loosers.component';




const losersRoutes: Routes = [
  {
    path: '' , component: LoosersComponent,
    children: [
  {
    path: 'details/:id',
    loadChildren: () => import('../../stocksdetail/stocks-detail.module').then(m => m.StocksDetailModule)
  }
  ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(losersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LosersRoutingModule { }