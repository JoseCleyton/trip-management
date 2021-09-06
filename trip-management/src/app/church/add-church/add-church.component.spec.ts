import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChurchComponent } from './add-church.component';

describe('AddChurchComponent', () => {
  let component: AddChurchComponent;
  let fixture: ComponentFixture<AddChurchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChurchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChurchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
