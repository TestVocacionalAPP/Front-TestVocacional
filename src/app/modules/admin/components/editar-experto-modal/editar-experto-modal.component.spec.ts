import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarExpertoModalComponent } from './editar-experto-modal.component';

describe('EditarExpertoModalComponent', () => {
  let component: EditarExpertoModalComponent;
  let fixture: ComponentFixture<EditarExpertoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarExpertoModalComponent]
    });
    fixture = TestBed.createComponent(EditarExpertoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
