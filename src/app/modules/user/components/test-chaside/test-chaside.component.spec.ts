import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChasideComponent } from './test-chaside.component';

describe('TestChasideComponent', () => {
  let component: TestChasideComponent;
  let fixture: ComponentFixture<TestChasideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestChasideComponent]
    });
    fixture = TestBed.createComponent(TestChasideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
