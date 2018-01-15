import {CommonModule} from '@angular/common';
import {APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, Provider, SkipSelf} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {LoggerModule} from 'ngx-logger';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {FakeKeycloakService, initializer} from './utils/security-init';
import {NgxSecurityConfig} from './models/ngx-security-config';

export function ngxKeycloakSecurityModuleComponents() {
  return [];
}

export function ngxKeycloakSecurityModuleProviders(): Provider[] {
  return [];
}

export function buildNgxKeycloakSecurityProvider(config: NgxSecurityConfig): Provider[] {
  if (config.mock) {
    return [buildFakeNgxKeycloakSecurityProvider()];
  } else {
    return [
      {provide: NgxSecurityConfig, useValue: config},
      {
        provide: APP_INITIALIZER, useFactory: initializer, multi: true,
        deps: [KeycloakService, NgxSecurityConfig]
      }];
  }
}

function buildFakeNgxKeycloakSecurityProvider(): Provider {
  return {provide: KeycloakService, useClass: FakeKeycloakService};
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    KeycloakAngularModule,
    LoggerModule.forChild()
  ],
  exports: [...ngxKeycloakSecurityModuleComponents(), KeycloakAngularModule],
  declarations: [...ngxKeycloakSecurityModuleComponents()],
  providers: []
})
export class NgxKeycloakSecurityModule {

  constructor(@Optional() @SkipSelf() parentModule: NgxKeycloakSecurityModule) {
    throwIfAlreadyLoaded(parentModule, 'NgxKeycloakSecurityModule');
  }

  static forRoot(config: NgxSecurityConfig): ModuleWithProviders {
    return {
      ngModule: NgxKeycloakSecurityModule,
      providers: [...ngxKeycloakSecurityModuleProviders(), ...buildNgxKeycloakSecurityProvider(config)]
    };
  }
}

