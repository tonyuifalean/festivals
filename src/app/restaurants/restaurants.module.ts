import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';

import { GoogleMapsWrapperModule } from '@app/google-maps-wrapper';
import { httpTranslateLoader, SharedModule } from '@app/shared';
import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantsComponent } from './restaurants.component';

@NgModule({
  declarations: [
    RestaurantsComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsWrapperModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    RestaurantsRoutingModule,
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
export class RestaurantsModule { }
