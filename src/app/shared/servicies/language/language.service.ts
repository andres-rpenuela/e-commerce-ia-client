import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, inject, signal, Signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize, of, tap } from 'rxjs';

import { Language } from '@shared/models/language.model';


@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  private readonly _http = inject(HttpClient);
  private readonly _destroyRef = inject(DestroyRef);

  private readonly API_URL = 'http://localhost:8080/api/v1/languages';

  private readonly DEFAULT_LANGUAGES: Language[] = [
    { id: 1, code: 'es', country: 'es', enabled: true },
    { id: 2, code: 'en', country: 'us', enabled: true },
  ];

  private readonly _languages : WritableSignal<Language[]> = signal<Language[]>(this.DEFAULT_LANGUAGES);
  readonly languages : Signal<Language[]> = this._languages.asReadonly();

  private readonly _languagesLoaded : WritableSignal<boolean> = signal(false);
  readonly languagesLoaded : Signal<boolean> = this._languagesLoaded.asReadonly();

  constructor() {
    this.load();
  }

  private load(): void {
    this._http.get<Language[]>(this.API_URL).pipe(
      takeUntilDestroyed(this._destroyRef),
      tap(languages => this._languages.set(languages)),
      catchError(error => {
        console.error('Error al cargar los idiomas:', error);
        this._languages.set(this.DEFAULT_LANGUAGES);
        return of(this.DEFAULT_LANGUAGES);
      }),
      finalize(() => {
        this._languagesLoaded.set(true);
      })
    ).subscribe();
  }
}
