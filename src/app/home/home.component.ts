import { animate, /* query, stagger, */ state, style, transition, trigger } from '@angular/animations';
// import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

import { AuthenticationService, User } from '@app/shared';
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
      { name: 'description', content: 'Home of Festivals in Sighișoara' },
      { name: 'author', content: 'VEEZBLE SRL' },
      { name: 'keywords', content: 'Sighișoara, Festival, Medieval, Transylvania'}
    ]);
    this.title.setTitle('Home - SighișoaraFestival');

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
