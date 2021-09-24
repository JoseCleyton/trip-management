import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCostCenterComponent } from './delete-cost-center.component';

describe('DeleteCostCenterComponent', () => {
  let component: DeleteCostCenterComponent;
  let fixture: ComponentFixture<DeleteCostCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCostCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCostCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
