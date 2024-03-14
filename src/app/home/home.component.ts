import { animate, /* query, stagger, */ state, style, transition, trigger } from '@angular/animations';
// import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

// import { AuthenticationService, User } from '@app/shared';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('img', [
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
export class HomeComponent {
  // public currentUser: User = {};

  constructor(
    public translate: TranslateService,
    // private authenticationService: AuthenticationService,
    private gtag: GoogleTagManagerService,
    // private router: Router,
    private meta: Meta,
    private title: Title,
  ) {
    // this.authenticationService.currentUser.subscribe(
    //   (x) => (this.currentUser = x)
    // );

    this.meta.addTags([
      {
        name: 'description',
        content:
          "Discover the enchanting Sighisoara Festival website, your ultimate guide to the vibrant and colorful cultural celebrations of Sighisoara, Romania. Dive into the heart of medieval festivities, explore schedules, events, and exclusive insights into the world-famous Medieval Festival, along with other local celebrations and traditions. Experience the magic of Sighisoara through captivating images, detailed event descriptions, and practical visitor information. Join us to celebrate the rich heritage and lively spirit of Sighisoara's festivals!",
      },
      { name: 'author', content: 'VEEZBLE' },
      {
        name: 'keywords',
        content:
          'Sighisoara festival homepage, Sighisoara cultural events, Sighisoara medieval celebrations, Festival schedule Sighisoara, Sighisoara event calendar, Sighisoara arts festival, Sighisoara summer festivals, Sighisoara heritage events, Sighisoara live performances, Sighisoara festival highlights',
      },
    ]);
    this.title.setTitle('Sighisoara Festival');

    if (environment.production) {
      const gtmTag = {
        event: 'page',
        page_title: 'Home',
        page_location: 'https://sighisoarafestival.com/home'
      };
      this.gtag.pushTag(gtmTag);
    }
  }
}
