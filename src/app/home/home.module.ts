import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule }   from '@angular/common';
import { CoreModule }   from '../core/core.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent, 
  ],
  exports: [
   CoreModule
  ],
  imports: [
    CoreModule,
    HomeRoutingModule,
    CommonModule
  ],
  providers: []
})
export class HomeModule { 

}
