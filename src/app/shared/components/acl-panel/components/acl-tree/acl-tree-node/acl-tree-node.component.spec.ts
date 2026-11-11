import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AclTreeNodeComponent } from './acl-tree-node.component';

describe('AclTreeNode', () => {
  let component: AclTreeNodeComponent;
  let fixture: ComponentFixture<AclTreeNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AclTreeNodeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AclTreeNodeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
