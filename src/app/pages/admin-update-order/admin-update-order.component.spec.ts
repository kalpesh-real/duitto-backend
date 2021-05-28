import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateOrderComponent } from './admin-update-order.component';

describe('AdminUpdateOrderComponent', () => {
  let component: AdminUpdateOrderComponent;
  let fixture: ComponentFixture<AdminUpdateOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUpdateOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpdateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
