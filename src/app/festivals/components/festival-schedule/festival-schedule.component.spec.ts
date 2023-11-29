import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalScheduleComponent } from './festival-schedule.component';

describe('FestivalScheduleComponent', () => {
  let component: FestivalScheduleComponent;
  let fixture: ComponentFixture<FestivalScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FestivalScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FestivalScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
