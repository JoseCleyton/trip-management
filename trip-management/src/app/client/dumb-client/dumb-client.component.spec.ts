import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbClientComponent } from './dumb-client.component';

describe('DumbClientComponent', () => {
  let component: DumbClientComponent;
  let fixture: ComponentFixture<DumbClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DumbClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DumbClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
