
import { HttpClient } from '@angular/common/http';
import {
  TranslateLoader,
  TranslationObject
} from '@ngx-translate/core';
import { forkJoin, map, Observable } from 'rxjs';

export class TranslationLoader implements TranslateLoader {
  constructor(private readonly http: HttpClient) {}

  getTranslation(lang: string): Observable<TranslationObject> {
    const modules = [
      'buttons',
      'commons',
      'permissions',
      'technical-roles',
      'functional-roles',
      "spinners",
      'contexts'
    ];

    const requests = modules.map(module =>
      this.http.get<TranslationObject>(
        `/i18n/${lang}/${module}.json`
      )
    );

    return forkJoin(requests).pipe(
      map(translations =>
        Object.assign({}, ...translations) as TranslationObject
      )
    );
  }
}
