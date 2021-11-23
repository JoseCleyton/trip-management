import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTechDumbComponent } from './dashboard-tech-dumb.component';

describe('DashboardTechDumbComponent', () => {
  let component: DashboardTechDumbComponent;
  let fixture: ComponentFixture<DashboardTechDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTechDumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTechDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
