import { Component } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Gtag } from 'angular-gtag';

import { environment } from '@environments/environment';
import { ATTRACTIONS_LOCATIONS } from './attraction-location.data';
import { AttractionLocationModel } from './attraction-location.model';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.scss']
})
export class AttractionsComponent {

  locations: AttractionLocationModel[] = ATTRACTIONS_LOCATIONS;

  constructor(
    public translate: TranslateService,
    private gtag: Gtag,
    private meta: Meta,
    private title: Title,
  ) {
    this.meta.addTags([
      { name: 'description', content: 'Tourist Attractions in Sighișoara' },
      { name: 'author', content: 'VEEZBLE SRL' },
      { name: 'keywords', content: 'Sighișoara, Transylvania, Tourist Attractions' },
    ]);
    this.title.setTitle('Tourist Attractions - SighișoaraFestival');

    if (environment.production) {
      this.gtag.pageview({
        page_title: 'Attractions',
        page_path: '/attractions',
        page_location: 'https://sighisoarafestival.com/attractions'
      });
    }
  }
}
