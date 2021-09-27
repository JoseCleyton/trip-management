import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbUserComponent } from './dumb-user.component';

describe('DumbUserComponent', () => {
  let component: DumbUserComponent;
  let fixture: ComponentFixture<DumbUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DumbUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DumbUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
