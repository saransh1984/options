import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';


const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'gainers',
        loadChildren: () => import('./gainers/gainers.module').then(m => m.GainersModule)
      },
      {
        path: 'losers',
        loadChildren: () => import('./loosers/losers.module').then(m => m.LosersModule)
      },
      {
        path: 'details',
        loadChildren: () => import('./details/details.module').then(m => m.DetailsModule)
      },
      {
        path: 'earnings',
        loadChildren: () => import('./earnings/earnings.module').then(m => m.EarningsModule)
      },
      {
        path: 'search',
        loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
      }
    ]
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
export class HomeRoutingModule { }