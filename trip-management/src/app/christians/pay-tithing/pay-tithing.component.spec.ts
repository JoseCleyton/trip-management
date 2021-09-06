import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayTithingComponent } from './pay-tithing.component';

describe('PayTithingComponent', () => {
  let component: PayTithingComponent;
  let fixture: ComponentFixture<PayTithingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayTithingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayTithingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
