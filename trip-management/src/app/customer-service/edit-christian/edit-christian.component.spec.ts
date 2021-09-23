import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChristianComponent } from './edit-christian.component';

describe('EditChristianComponent', () => {
  let component: EditChristianComponent;
  let fixture: ComponentFixture<EditChristianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditChristianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChristianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
