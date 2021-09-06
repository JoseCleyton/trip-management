import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteChristianComponent } from './delete-christian.component';

describe('DeleteChristianComponent', () => {
  let component: DeleteChristianComponent;
  let fixture: ComponentFixture<DeleteChristianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteChristianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteChristianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
