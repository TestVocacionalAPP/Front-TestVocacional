import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbardAdminComponent } from './navbard-admin.component';

describe('NavbardAdminComponent', () => {
  let component: NavbardAdminComponent;
  let fixture: ComponentFixture<NavbardAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbardAdminComponent]
    });
    fixture = TestBed.createComponent(NavbardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
