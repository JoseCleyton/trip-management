import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUpComponent } from './menu-up.component';

describe('MenuUpComponent', () => {
  let component: MenuUpComponent;
  let fixture: ComponentFixture<MenuUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
