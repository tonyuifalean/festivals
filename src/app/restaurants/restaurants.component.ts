import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { ClipboardService } from 'ngx-clipboard';

import { environment } from '@environments/environment';
import { RESTAURANTS } from './restaurant.data';
import { RestaurantModel } from './restaurant.model';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
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
export class RestaurantsComponent {
  restaurants: RestaurantModel[] = RESTAURANTS;

  constructor(
    public translate: TranslateService,
    private clipboardService: ClipboardService,
    private gtag: GoogleTagManagerService,
    private meta: Meta,
    private title: Title,
    private snackBar: MatSnackBar
  ) {
    this.meta.addTags([
      { name: 'description', content: 'Restaurants in Sighișoara' },
      { name: 'author', content: 'VEEZBLE SRL' },
      { name: 'keywords', content: 'Sighișoara, Transylvania, Restaurants'}
    ]);
    this.title.setTitle('Restaurants - SighișoaraFestival');

    if (environment.production) {
      const gtmTag = {
        event: 'page',
        page_title: 'Restaurants',
        page_location: 'https://sighisoarafestival.com/restaurants'
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
