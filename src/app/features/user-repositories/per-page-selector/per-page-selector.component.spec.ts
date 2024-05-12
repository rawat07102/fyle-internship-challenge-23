import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerPageSelectorComponent } from './per-page-selector.component';

describe('PerPageSelectorComponent', () => {
  let component: PerPageSelectorComponent;
  let fixture: ComponentFixture<PerPageSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerPageSelectorComponent]
    });
    fixture = TestBed.createComponent(PerPageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
