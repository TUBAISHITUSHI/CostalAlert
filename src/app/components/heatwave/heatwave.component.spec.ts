import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatwaveComponent } from './heatwave.component';

describe('HeatwaveComponent', () => {
  let component: HeatwaveComponent;
  let fixture: ComponentFixture<HeatwaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeatwaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatwaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
