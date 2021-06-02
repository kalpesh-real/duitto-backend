import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameRequestReasonformComponent } from './username-request-reasonform.component';

describe('UsernameRequestReasonformComponent', () => {
  let component: UsernameRequestReasonformComponent;
  let fixture: ComponentFixture<UsernameRequestReasonformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsernameRequestReasonformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsernameRequestReasonformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
