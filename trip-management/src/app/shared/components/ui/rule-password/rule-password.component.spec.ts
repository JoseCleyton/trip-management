import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulePasswordComponent } from './rule-password.component';

describe('RulePasswordComponent', () => {
  let component: RulePasswordComponent;
  let fixture: ComponentFixture<RulePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
