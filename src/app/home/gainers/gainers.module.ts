import { NgModule } from '@angular/core';
import { GainersRoutingModule } from './gainers-routing.module';
import { GainersComponent } from './gainers.component';
import { CommonModule }   from '@angular/common';
import { CoreModule }   from '../../core/core.module';
import { ThousandSuffixesPipe } from '../../thousand-suff.pipe';

@NgModule({
  declarations: [
    GainersComponent, 
  ],
  exports: [
   CoreModule
  ],
  imports: [
    CoreModule,
    GainersRoutingModule,
    CommonModule
  ],
  providers: []
})
export class GainersModule { 

}
