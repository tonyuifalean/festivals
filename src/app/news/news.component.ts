import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {

  constructor(
    public translate: TranslateService,
    private gtag: GoogleTagManagerService,
    private meta: Meta,
    private title: Title,
  ) {
    this.setMetaTags();
    this.title.setTitle('News - Sighisoara Festival');

    if (environment.production) {
      const gtmTag = {
        event: 'page',
        page_title: 'News',
        page_location: 'https://sighisoarafestival.com/news'
      };
      this.gtag.pushTag(gtmTag);
    }
  }

  private setMetaTags(): void {
    this.meta.updateTag({ name: 'description', content: 'News about Sighișoara' });
    this.meta.updateTag({ name: 'author', content: 'VEEZBLE' });
    this.meta.updateTag({ name: 'keywords', content: 'Sighișoara, Transylvania, News' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Sighisoara Festival' });
    this.meta.updateTag({ property: 'og:title', content: 'News - Sighisoara Festival' });
    this.meta.updateTag({ property: 'og:description', content: "The latest news from Sighisoara — updates on festivals, events, and everything happening in this historic Transylvanian city." });
    this.meta.updateTag({ property: 'og:url', content: 'https://sighisoarafestival.com/news' });
    this.meta.updateTag({ property: 'og:image', content: 'https://sighisoarafestival.com/assets/images/festivals.jpg' });
  }
}
