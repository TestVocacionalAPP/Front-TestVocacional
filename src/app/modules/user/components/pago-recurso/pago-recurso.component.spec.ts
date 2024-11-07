import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoRecursoComponent } from './pago-recurso.component';

describe('PagoRecursoComponent', () => {
  let component: PagoRecursoComponent;
  let fixture: ComponentFixture<PagoRecursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagoRecursoComponent]
    });
    fixture = TestBed.createComponent(PagoRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
