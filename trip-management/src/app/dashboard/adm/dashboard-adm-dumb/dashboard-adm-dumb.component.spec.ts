import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdmDumbComponent } from './dashboard-adm-dumb.component';

describe('DashboardAdmDumbComponent', () => {
  let component: DashboardAdmDumbComponent;
  let fixture: ComponentFixture<DashboardAdmDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAdmDumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAdmDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
