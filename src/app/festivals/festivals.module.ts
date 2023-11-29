import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';

import { GoogleMapsWrapperModule } from '@app/google-maps-wrapper';
import { httpTranslateLoader, SharedModule } from '@app/shared';
import { FestivalDetailsComponent, FestivalListComponent, FestivalScheduleComponent } from './components';
import { FestivalsRoutingModule } from './festivals-routing.module';


@NgModule({
  declarations: [FestivalListComponent, FestivalDetailsComponent, FestivalScheduleComponent],
  imports: [
    CommonModule,
    FestivalsRoutingModule,
    GoogleMapsWrapperModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
})
export class FestivalsModule {}
