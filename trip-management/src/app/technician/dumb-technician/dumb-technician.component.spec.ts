import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbTechnicianComponent } from './dumb-technician.component';

describe('DumbTechnicianComponent', () => {
  let component: DumbTechnicianComponent;
  let fixture: ComponentFixture<DumbTechnicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DumbTechnicianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DumbTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
