import {KeycloakConfig} from 'keycloak-angular';

export class NgxSecurityConfig {
  config: KeycloakConfig;
  mock: boolean;
  bearerExcludedUrls: string[];

  constructor(obj?: any) {
    this.config = obj && obj.config;
    this.mock = obj && obj.mock;
    this.bearerExcludedUrls = obj && obj.bearerExcludedUrls;
  }
}
