import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { FestivalDetailsComponent } from './festival-details.component';

describe('FestivalDetailsComponent', () => {
  let component: FestivalDetailsComponent;
  let fixture: ComponentFixture<FestivalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FestivalDetailsComponent],
      imports: [
        HttpClientModule,
        TranslateModule.forRoot()
      ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          params: of({ id: 123 })
        }
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FestivalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
