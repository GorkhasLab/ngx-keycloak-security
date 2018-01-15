export const environment = {
  production: true,
  securityConfig: {
    config: {
      url: '/auth',
      realm: 'ngx-test-realm',
      clientId: 'ngx-test-client'
    },
    mock: false,
    bearerExcludedUrls: ['/assets']
  }
};
