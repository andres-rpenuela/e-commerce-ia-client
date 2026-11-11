import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AclTreeComponent } from './acl-tree.component';

describe('AclTree', () => {
  let component: AclTreeComponent;
  let fixture: ComponentFixture<AclTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AclTreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AclTreeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
