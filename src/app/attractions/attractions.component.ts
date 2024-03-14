import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

import { environment } from '@environments/environment';
import { ATTRACTIONS_LOCATIONS } from './attraction-location.data';
import { AttractionLocationModel } from './attraction-location.model';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.scss'],
})
export class AttractionsComponent {
  locations: AttractionLocationModel[] = ATTRACTIONS_LOCATIONS;

  constructor(
    public translate: TranslateService,
    private gtag: GoogleTagManagerService,
    private meta: Meta,
    private title: Title
  ) {
    this.meta.addTags([
      {
        name: 'description',
        content:
          "Explore the Attractions of Sighisoara page to uncover the hidden gems and iconic landmarks of this medieval city. Get a glimpse into Sighisoara's rich history and vibrant culture with our concise guides, beautiful imagery, and essential visitor information, making your trip planning seamless and enjoyable.",
      },
      { name: 'author', content: 'VEEZBLE' },
      {
        name: 'keywords',
        content:
          'Sighisoara tourist attractions, Top sights Sighisoara, Sighisoara landmarks, Things to do in Sighisoara, Sighisoara must-see, Sighisoara historic sites, Visit Sighisoara, Sighisoara travel guide, Sighisoara sightseeing, Sighisoara points of interest',
      },
    ]);
    this.title.setTitle('Tourist Attractions - Sighisoara Festival');

    if (environment.production) {
      const gtmTag = {
        event: 'page',
        page_title: 'Attractions',
        page_location: 'https://sighisoarafestival.com/attractions',
      };
      this.gtag.pushTag(gtmTag);
    }
  }
}
