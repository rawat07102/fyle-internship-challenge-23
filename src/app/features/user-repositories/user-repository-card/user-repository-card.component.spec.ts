import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRepositoryCardComponent } from './user-repository-card.component';

describe('UserRepositoryCardComponent', () => {
  let component: UserRepositoryCardComponent;
  let fixture: ComponentFixture<UserRepositoryCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRepositoryCardComponent]
    });
    fixture = TestBed.createComponent(UserRepositoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
