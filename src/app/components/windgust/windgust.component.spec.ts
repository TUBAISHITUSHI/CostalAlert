import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindgustComponent } from './windgust.component';

describe('WindgustComponent', () => {
  let component: WindgustComponent;
  let fixture: ComponentFixture<WindgustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindgustComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindgustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
