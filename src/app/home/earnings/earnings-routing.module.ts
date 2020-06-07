import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EarningsComponent } from './earnings.component';

const detailsRoutes: Routes = [
  {
    path: '', component: EarningsComponent,
    children: [
      
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
export class EarningsRoutingModule { }