import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Gtag } from 'angular-gtag';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {

  constructor(
    public translate: TranslateService,
    private gtag: Gtag,
    private meta: Meta,
    private title: Title,
  ) {
    this.meta.addTags([
      { name: 'description', content: 'News about Sighișoara' },
      { name: 'author', content: 'VEEZBLE SRL' },
      { name: 'keywords', content: 'Sighișoara, Transylvania, News' },
    ]);
    this.title.setTitle('News - SighișoaraFestival');

    if (environment.production) {
      this.gtag.pageview({
        page_title: 'News',
        page_path: '/news',
        page_location: 'https://sighisoarafestival.com/news'
      });
    }
  }
}
