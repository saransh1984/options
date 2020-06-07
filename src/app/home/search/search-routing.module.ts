import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search.component';

const searchRoutes: Routes = [
  {
    path: '', component: SearchComponent,
    children: [
      {
        path: 'stock/:id/:type',
        loadChildren: () => import('../../stocksdetail/stocks-detail.module').then(m => m.StocksDetailModule)
      },
      {
        path: 'details',
        loadChildren: () => import('../details/details.module').then(m => m.DetailsModule)
      },
      {
          path: 'details/:id',
          loadChildren: () => import('../../stocksdetail/stocks-detail.module').then(m => m.StocksDetailModule)
      },
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(searchRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SearchRoutingModule { }