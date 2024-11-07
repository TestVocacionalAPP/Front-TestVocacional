import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTestComponent } from './registro-test.component';

describe('RegistroTestComponent', () => {
  let component: RegistroTestComponent;
  let fixture: ComponentFixture<RegistroTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroTestComponent]
    });
    fixture = TestBed.createComponent(RegistroTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
