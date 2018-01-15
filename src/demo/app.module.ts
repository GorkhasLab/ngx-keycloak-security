import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {NgxKeycloakSecurityModule} from '../../target';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.OFF
    }),
    NgxKeycloakSecurityModule.forRoot(environment.securityConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
