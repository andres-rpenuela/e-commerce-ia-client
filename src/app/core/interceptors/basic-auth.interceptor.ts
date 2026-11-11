import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const basicAuthInterceptor: HttpInterceptorFn = (req, next) => {

  const { username, password } = environment.basicAuth;

  console.debug('Basic Auth username:', username);
  console.debug('Password configured:', !!password.slice(0,3),'....');

  const credentials = btoa(`${username}:${password}`);

  console.debug('Authorization:', `Basic ${credentials.slice(0,3)}....`);

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Basic ${credentials}`
    }
  });

  return next(authReq);
};
