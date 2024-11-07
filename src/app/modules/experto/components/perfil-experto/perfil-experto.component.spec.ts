import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilExpertoComponent } from './perfil-experto.component';

describe('PerfilExpertoComponent', () => {
  let component: PerfilExpertoComponent;
  let fixture: ComponentFixture<PerfilExpertoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilExpertoComponent]
    });
    fixture = TestBed.createComponent(PerfilExpertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
