export const environment = {
  production: true,  // Enciende optimizaciones estrictas de producción en Angular
  apiUrl: import.meta.env['NG_APP_API_URL'],
  ambiente: import.meta.env['NG_APP_ENV_NAME'],
  perfil: import.meta.env['NG_APP_ENV'] ,         // 'production'
  basicAuth: {
    username: import.meta.env['NG_APP_BASIC_AUTH_USERNAME'],
    password: import.meta.env['NG_APP_BASIC_AUTH_PASSWORD']
  }
};
