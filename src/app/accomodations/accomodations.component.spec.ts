import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { AccomodationsComponent } from './accomodations.component';

describe('AccomodationsComponent', () => {
  let component: AccomodationsComponent;
  let fixture: ComponentFixture<AccomodationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccomodationsComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
