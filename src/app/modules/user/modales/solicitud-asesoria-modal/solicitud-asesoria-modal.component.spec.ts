import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudAsesoriaModalComponent } from './solicitud-asesoria-modal.component';

describe('SolicitudAsesoriaModalComponent', () => {
  let component: SolicitudAsesoriaModalComponent;
  let fixture: ComponentFixture<SolicitudAsesoriaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudAsesoriaModalComponent]
    });
    fixture = TestBed.createComponent(SolicitudAsesoriaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
