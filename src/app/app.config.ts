
import {
  ApplicationConfig,
  inject,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HttpClient,
  provideHttpClient, withInterceptors
} from '@angular/common/http';
import {
  provideTranslateLoader,
  provideTranslateService
} from '@ngx-translate/core';

import { routes } from './app.routes';
import { TranslationLoader } from '@shared/i18n/translation-loader';
import { basicAuthInterceptor } from '@core/interceptors/basic-auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    //provideHttpClient(),
    provideHttpClient(
      withInterceptors([
        basicAuthInterceptor
      ])
    ),
    provideTranslateService({
      loader: provideTranslateLoader(
        () => new TranslationLoader(inject(HttpClient))
      ),
      lang: 'es',
      fallbackLang: 'es'
    })
  ]
};
