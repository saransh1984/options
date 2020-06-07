import { NgModule } from '@angular/core';
import { LosersRoutingModule } from './losers-routing.module';
import { LoosersComponent } from './loosers.component';
import { CommonModule }   from '@angular/common';
import { CoreModule }   from '../../core/core.module';
import { StocksDetailComponent } from '../../stocksdetail/stocks-detail.component'
import { ThousandSuffixesPipe } from '../../thousand-suff.pipe';


@NgModule({
  declarations: [
    LoosersComponent
  ],
  exports: [
   CoreModule
  ],
  imports: [
    CoreModule,
    CommonModule,
    LosersRoutingModule,
  ],
  providers: []
})
export class LosersModule { 

}
