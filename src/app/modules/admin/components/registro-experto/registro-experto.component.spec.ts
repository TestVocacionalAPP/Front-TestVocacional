import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroExpertoComponent } from './registro-experto.component';

describe('RegistroExpertoComponent', () => {
  let component: RegistroExpertoComponent;
  let fixture: ComponentFixture<RegistroExpertoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroExpertoComponent]
    });
    fixture = TestBed.createComponent(RegistroExpertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
