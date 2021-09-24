import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbCostCenterComponent } from './dumb-cost-center.component';

describe('DumbCostCenterComponent', () => {
  let component: DumbCostCenterComponent;
  let fixture: ComponentFixture<DumbCostCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DumbCostCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DumbCostCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
