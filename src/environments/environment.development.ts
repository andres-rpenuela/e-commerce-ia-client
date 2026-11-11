export const environment = {
  production: false,
  apiUrl: import.meta.env['NG_APP_API_URL'],
  ambiente: import.meta.env['NG_APP_ENV_NAME'], // 💡 Cambiado a NG_APP_ENV_NAME
  perfil: import.meta.env['NG_APP_ENV'],       // 💡 Opcional: para lógicas de código ('local')
  basicAuth: {
    username: import.meta.env['NG_APP_BASIC_AUTH_USERNAME'],
    password: import.meta.env['NG_APP_BASIC_AUTH_PASSWORD']
  }
};
