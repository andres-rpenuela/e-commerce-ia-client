export const environment = {
  production: false, // Se mantiene en false para permitir depuración rápida en staging
  apiUrl: import.meta.env['NG_APP_API_URL'],
  ambiente: import.meta.env['NG_APP_ENV_NAME'],
  perfil: import.meta.env['NG_APP_ENV'],         // 'preproduction'
  basicAuth: {
    username: import.meta.env['NG_APP_BASIC_AUTH_USERNAME'],
    password: import.meta.env['NG_APP_BASIC_AUTH_PASSWORD']
  }
};
