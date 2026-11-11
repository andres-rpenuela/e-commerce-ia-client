import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AclPanelComponent } from './acl-panel.component';

describe('AclPanel', () => {
  let component: AclPanelComponent;
  let fixture: ComponentFixture<AclPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AclPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AclPanelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
