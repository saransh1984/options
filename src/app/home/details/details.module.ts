import { NgModule } from '@angular/core';
import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { StocksDetailComponent } from '../../stocksdetail/stocks-detail.component'
import { CommonModule }   from '@angular/common';
import { CoreModule }   from '../../core/core.module';
import { ThousandSuffixesPipe } from '../../thousand-suff.pipe';

@NgModule({
  declarations: [
    DetailsComponent, 
  ],
  exports: [
   CoreModule
  ],
  imports: [
    CoreModule,
    DetailsRoutingModule,
    CommonModule
  ],
  providers: []
})
export class DetailsModule { 

}
