import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AclDetailComponent } from './acl-detail.component';

describe('AcleDetail', () => {
  let component: AclDetailComponent;
  let fixture: ComponentFixture<AclDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AclDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AclDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
