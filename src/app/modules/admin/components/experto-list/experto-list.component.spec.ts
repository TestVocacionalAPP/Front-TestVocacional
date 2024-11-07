import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertoListComponent } from './experto-list.component';

describe('ExpertoListComponent', () => {
  let component: ExpertoListComponent;
  let fixture: ComponentFixture<ExpertoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertoListComponent]
    });
    fixture = TestBed.createComponent(ExpertoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
