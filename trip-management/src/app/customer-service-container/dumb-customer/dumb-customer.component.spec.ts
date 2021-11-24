import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbCustomerComponent } from './dumb-customer.component';

describe('DumbCustomerComponent', () => {
  let component: DumbCustomerComponent;
  let fixture: ComponentFixture<DumbCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DumbCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DumbCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
