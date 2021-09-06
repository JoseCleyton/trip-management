import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChristianComponent } from './add-christian.component';

describe('AddChristianComponent', () => {
  let component: AddChristianComponent;
  let fixture: ComponentFixture<AddChristianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChristianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChristianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
