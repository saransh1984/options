import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocksDetailComponent } from './stocks-detail.component';



const homeRoutes: Routes = [
  {
    path: '', component: StocksDetailComponent,
    runGuardsAndResolvers: 'always',
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StocksDetailRoutingModule { }