import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapsWrapperComponent } from './google-maps-wrapper.component';

describe('GoogleMapsComponent', () => {
  let component: GoogleMapsWrapperComponent;
  let fixture: ComponentFixture<GoogleMapsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleMapsWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleMapsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
