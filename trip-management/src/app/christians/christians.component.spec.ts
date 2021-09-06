import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChristiansComponent } from './christians.component';

describe('ChristiansComponent', () => {
  let component: ChristiansComponent;
  let fixture: ComponentFixture<ChristiansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChristiansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChristiansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
