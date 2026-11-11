import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingModalComponent } from './loading-modal.component';

describe('Loading', () => {
  let component: LoadingModalComponent;
  let fixture: ComponentFixture<LoadingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
