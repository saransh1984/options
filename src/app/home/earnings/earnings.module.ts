import { NgModule } from '@angular/core';
import { EarningsRoutingModule } from './earnings-routing.module';
import { EarningsComponent } from './earnings.component';
import { CommonModule }   from '@angular/common';
import { CoreModule }   from '../../core/core.module';
import { ThousandSuffixesPipe } from '../../thousand-suff.pipe';

@NgModule({
  declarations: [
    EarningsComponent, 
  ],
  exports: [
   CoreModule
  ],
  imports: [
    CoreModule,
    EarningsRoutingModule,
    CommonModule
  ],
  providers: []
})
export class EarningsModule { 

}
