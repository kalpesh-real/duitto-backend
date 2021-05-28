import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginRegistrationComponent } from './user-login-registration.component';

describe('UserLoginRegistrationComponent', () => {
  let component: UserLoginRegistrationComponent;
  let fixture: ComponentFixture<UserLoginRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLoginRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
