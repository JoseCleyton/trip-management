import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChurchComponent } from './edit-church.component';

describe('EditChurchComponent', () => {
  let component: EditChurchComponent;
  let fixture: ComponentFixture<EditChurchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditChurchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChurchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
