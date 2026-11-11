import { TestBed } from '@angular/core/testing';
import { LanguageService } from '@shared/servicies/language/language.service';

describe('LanguageService', () => {

  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguageService]
    });

    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
