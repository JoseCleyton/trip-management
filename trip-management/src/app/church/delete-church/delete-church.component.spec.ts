import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteChurchComponent } from './delete-church.component';

describe('DeleteChurchComponent', () => {
  let component: DeleteChurchComponent;
  let fixture: ComponentFixture<DeleteChurchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteChurchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteChurchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
