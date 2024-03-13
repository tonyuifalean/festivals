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
  animations: [
    trigger('card', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(500),
      ]),
      transition('* => void', [
        animate(500, style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class AccomodationsComponent {
  accomodations: AccomodationModel[] = ACCOMODATIONS;

  constructor(
    public translate: TranslateService,
    private clipboardService: ClipboardService,
    private gtag: GoogleTagManagerService,
    private meta: Meta,
    private title: Title,
    private snackBar: MatSnackBar
  )  {
    this.meta.addTags([
      { name: 'description', content: 'Accomodations in Sighișoara' },
      { name: 'author', content: 'VEEZBLE SRL' },
      { name: 'keywords', content: 'Sighișoara, Festival, Medieval, Transylvania, Accomodations' },
    ]);
    this.title.setTitle('Accomodations - SighișoaraFestival');

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
