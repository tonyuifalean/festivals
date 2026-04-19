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
    this.setMetaTags();
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

  private setMetaTags(): void {
    this.meta.updateTag({
      name: 'description',
      content:
        "Explore the Attractions of Sighisoara page to uncover the hidden gems and iconic landmarks of this medieval city. Get a glimpse into Sighisoara's rich history and vibrant culture with our concise guides, beautiful imagery, and essential visitor information, making your trip planning seamless and enjoyable. / Explorează pagina \"Obiective în Sighișoara\" pentru a descoperi comorile ascunse și reperele iconice ale acestui oraș medieval. Află detalii despre bogata istorie și cultura vibrantă a Sighișoarei prin ghidurile noastre concise, imagini frumoase și informații esențiale pentru vizitatori, făcând planificarea călătoriei tale simplă și plăcută.",
    });
    this.meta.updateTag({ name: 'author', content: 'VEEZBLE' });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'Sighisoara tourist attractions, Top sights Sighisoara, Sighisoara landmarks, Things to do in Sighisoara, Sighisoara must-see, Sighisoara historic sites, Visit Sighisoara, Sighisoara travel guide, Sighisoara sightseeing, Sighisoara points of interest / Atracții turistice Sighișoara, Obiective de top Sighișoara, Repere Sighișoara, Lucruri de făcut în Sighișoara, De neratat în Sighișoara, Situri istorice Sighișoara, Vizitează Sighișoara, Ghid de călătorie Sighișoara, Turism în Sighișoara, Puncte de interes Sighișoara',
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Sighisoara Festival' });
    this.meta.updateTag({ property: 'og:title', content: 'Tourist Attractions - Sighisoara Festival' });
    this.meta.updateTag({ property: 'og:description', content: "Explore the hidden gems and iconic landmarks of Sighisoara. Guides, beautiful imagery, and essential visitor information for this medieval city." });
    this.meta.updateTag({ property: 'og:url', content: 'https://sighisoarafestival.com/attractions' });
    this.meta.updateTag({ property: 'og:image', content: 'https://sighisoarafestival.com/assets/images/attractions.jpg' });
  }
}
