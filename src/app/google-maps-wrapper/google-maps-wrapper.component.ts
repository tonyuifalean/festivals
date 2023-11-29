import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'google-maps-wrapper',
  templateUrl: './google-maps-wrapper.component.html',
  styleUrls: ['./google-maps-wrapper.component.scss'],
})
export class GoogleMapsWrapperComponent {
  @Input() markers: any[] = [];

  @ViewChild(MapInfoWindow, { static: false })
  info!: MapInfoWindow;

  apiLoaded: Observable<boolean> = of(false);
  options: google.maps.MapOptions = {
    center: { lat: 46.22029935584765, lng: 24.79185159175961 },
    zoom: 16,
  };
  infoContent!: { title: string; link: string};

  openInfo(marker: MapMarker, content: { title: string; link: string }) {
    this.infoContent = content;
    this.info.open(marker);
  }
}
