import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { AppRoutingModule }  from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ThousandSuffixesPipe } from './thousand-suff.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent
  ],
  exports: [
    CoreModule,

  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
