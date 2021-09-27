import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTechnicianComponent } from './delete-technician.component';

describe('DeleteTechnicianComponent', () => {
  let component: DeleteTechnicianComponent;
  let fixture: ComponentFixture<DeleteTechnicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTechnicianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
