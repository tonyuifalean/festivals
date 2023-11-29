import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

import { GoogleMapsWrapperModule } from '@app/google-maps-wrapper';
import { httpTranslateLoader, SharedModule } from '@app/shared';
import { AccomodadtionsRoutingModule } from './accomodations-routing.module';
import { AccomodationsComponent } from './accomodations.component';

@NgModule({
  declarations: [
    AccomodationsComponent
  ],
  imports: [
    CommonModule,
    AccomodadtionsRoutingModule,
    GoogleMapsWrapperModule,
    MatButtonModule,
    MatCardModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ]
})
export class AccomodationsModule { }
