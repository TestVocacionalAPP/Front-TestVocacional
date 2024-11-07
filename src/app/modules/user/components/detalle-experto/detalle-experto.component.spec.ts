import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleExpertoComponent } from './detalle-experto.component';

describe('DetalleExpertoComponent', () => {
  let component: DetalleExpertoComponent;
  let fixture: ComponentFixture<DetalleExpertoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleExpertoComponent]
    });
    fixture = TestBed.createComponent(DetalleExpertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
