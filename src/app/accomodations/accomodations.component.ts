import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { ClipboardService } from 'ngx-clipboard';

import { ACCOMODATIONS } from './accomodation.data';
import { AccomodationModel } from './accomodation.model';

@Component({
  selector: 'app-accomodations',
  templateUrl: './accomodations.component.html',
  styleUrls: ['./accomodations.component.scss'],
  // animations: [
  //   trigger('card', [
  //     state('in', style({ transform: 'translateX(0)' })),
  //     transition('void => *', [
  //       style({ transform: 'translateX(-100%)' }),
  //       animate(500),
  //     ]),
  //     transition('* => void', [
  //       animate(500, style({ transform: 'translateX(100%)' })),
  //     ]),
  //   ]),
  // ],
})
export class AccomodationsComponent {
  accomodations: AccomodationModel[] = ACCOMODATIONS;
  imageLoaded: { [id: string]: boolean } = {};

  constructor(
    public translate: TranslateService,
    private clipboardService: ClipboardService,
    private gtag: GoogleTagManagerService,
    private meta: Meta,
    private title: Title,
    private snackBar: MatSnackBar
  )  {
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Visit the Accommodations in Sighisoara page for a curated selection of the best places to stay in this historic town. / Vizitează pagina \"Cazare în Sighișoara\" pentru o selecție atent aleasă a celor mai bune locuri de cazare din acest oraș istoric.',
      },
      { name: 'author', content: 'VEEZBLE' },
      {
        name: 'keywords',
        content:
          'Sighisoara accommodations, Hotels in Sighisoara, Sighisoara lodging, Stay in Sighisoara, Sighisoara guesthouses, Sighisoara vacation rentals, Best places to stay Sighisoara, Sighisoara hotel deals, Luxury accommodation Sighisoara, Budget hotels Sighisoara / Cazare în Sighișoara, Hoteluri în Sighișoara, Locuri de cazare în Sighișoara, Cazare în Sighișoara, Pensiuni în Sighișoara, Închirieri de vacanță în Sighișoara, Cele mai bune locuri de cazare în Sighișoara, Oferte la hoteluri în Sighișoara, Cazare de lux în Sighișoara, Hoteluri ieftine în Sighișoara',
      },
    ]);
    this.title.setTitle('Accomodations - Sighisoara Festival');

    if (environment.production) {
      const gtmTag = {
        event: 'page',
        page_title: 'Accomodations',
        page_location: 'https://sighisoarafestival.com/accomodations'
      };
      this.gtag.pushTag(gtmTag);
    }
  }

  copyLocation(locationLink: string) {
    this.clipboardService.copyFromContent(locationLink);
    this.snackBar.open('Location copied to Clipboard', 'Close', {
      duration: 3000
    });
  }
}
