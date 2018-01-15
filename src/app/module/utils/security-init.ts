import {KeycloakService} from 'keycloak-angular';
import {Observable} from 'rxjs/Observable';
import {NgxSecurityConfig} from '../models/ngx-security-config';

export function initializer(keycloak: KeycloakService, securityConfig: NgxSecurityConfig): () => Promise<any> {
  return (): Promise<any> => {
    if (securityConfig && securityConfig.mock) {
      return Observable.of(true).toPromise();
    }
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            url: securityConfig.config.url,
            realm: securityConfig.config.realm,
            clientId: securityConfig.config.clientId
          },
          initOptions: {onLoad: 'login-required', checkLoginIframe: false},
          bearerExcludedUrls: ['/assets'].concat(securityConfig.bearerExcludedUrls)
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}

export class FakeKeycloakService extends KeycloakService {

  loadUserProfile(forceReload: boolean): Promise<any> {
    return Observable.of({
      id: '000000',
      username: 'foo',
      email: 'foo@bar.com',
      firstName: 'Foo',
      lastName: 'Bar'
    }).toPromise();
  }


  isLoggedIn(): Promise<boolean> {
    return Observable.of(true).toPromise();
  }


  getToken(): Promise<string> {
    return Observable.of('DEMO').toPromise();
  }

}
