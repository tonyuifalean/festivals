import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { GoogleMapsWrapperModule } from '@app/google-maps-wrapper';
import { httpTranslateLoader } from '@app/shared';
import { AttractionsRoutingModule } from './attractions-routing.module';
import { AttractionsComponent } from './attractions.component';

@NgModule({
  declarations: [AttractionsComponent],
  imports: [
    CommonModule,
    AttractionsRoutingModule,
    GoogleMapsWrapperModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
})
export class AttractionsModule {}
