import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslationInputFormComponent } from './translation-input-form.component';

describe('TranslationForm', () => {
  let component: TranslationInputFormComponent;
  let fixture: ComponentFixture<TranslationInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslationInputFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TranslationInputFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
