import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbardExpertoComponent } from './navbard-experto.component';

describe('NavbardExpertoComponent', () => {
  let component: NavbardExpertoComponent;
  let fixture: ComponentFixture<NavbardExpertoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbardExpertoComponent]
    });
    fixture = TestBed.createComponent(NavbardExpertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
