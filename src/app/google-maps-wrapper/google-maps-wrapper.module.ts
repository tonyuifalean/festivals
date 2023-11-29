import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { GoogleMapsWrapperComponent } from './google-maps-wrapper.component';

@NgModule({
  declarations: [
    GoogleMapsWrapperComponent,
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  exports: [
    GoogleMapsWrapperComponent,
  ],
})
export class GoogleMapsWrapperModule {}
