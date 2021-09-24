import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerServiceComponent } from './edit-customer-service.component';

describe('EditCustomerServiceComponent', () => {
  let component: EditCustomerServiceComponent;
  let fixture: ComponentFixture<EditCustomerServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCustomerServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustomerServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
