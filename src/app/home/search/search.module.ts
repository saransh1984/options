import { NgModule } from '@angular/core';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { StocksDetailComponent } from '../../stocksdetail/stocks-detail.component'
import { CommonModule }   from '@angular/common';
import { CoreModule }   from '../../core/core.module';
import { ThousandSuffixesPipe } from '../../thousand-suff.pipe';

@NgModule({
  declarations: [
    SearchComponent, 
  ],
  exports: [
   CoreModule
  ],
  imports: [
    CoreModule,
    SearchRoutingModule,
    CommonModule
  ],
  providers: []
})
export class SearchModule { 

}
