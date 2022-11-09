import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColdwaveComponent } from './coldwave.component';

describe('ColdwaveComponent', () => {
  let component: ColdwaveComponent;
  let fixture: ComponentFixture<ColdwaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColdwaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColdwaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
