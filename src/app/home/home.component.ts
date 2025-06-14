import { animate, /* query, stagger, */ state, style, transition, trigger } from '@angular/animations';
// import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

// import { AuthenticationService, User } from '@app/shared';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';

declare let gtag: Function;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('img', [
      state('in', style({ opacity: 1, transform: 'translateX(0) scale(1)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-40px) scale(0.98)' }),
        animate('800ms ease-out')
      ]),
      transition('* => void', [
        animate('600ms ease-in', style({ opacity: 0, transform: 'translateX(40px) scale(1.02)' }))
      ])
    ])
  ]
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
          "Discover the enchanting Sighisoara Festival website, your ultimate guide to the vibrant and colorful cultural celebrations of Sighisoara, Romania. Dive into the heart of medieval festivities, explore schedules, events, and exclusive insights into the world-famous Medieval Festival, along with other local celebrations and traditions. Experience the magic of Sighisoara through captivating images, detailed event descriptions, and practical visitor information. Join us to celebrate the rich heritage and lively spirit of Sighisoara's festivals! / Descoperă site-ul Festivalului Sighișoara , ghidul tău suprem pentru sărbătorile culturale vibrante și colorate din Sighișoara, România. Scufundă-te în inima festivităților medievale, explorează programele, evenimentele și informații exclusive despre faimosul Festival Sighisoara Medievală, împreună cu alte sărbători și tradiții locale. Experimentează magia Sighișoarei prin imagini captivante, descrieri detaliate ale evenimentelor și informații practice pentru vizitatori. Alătură-te nouă pentru a celebra bogatul patrimoniu și spiritul plin de viață al festivalurilor din Sighișoara!",
      },
      { name: 'author', content: 'VEEZBLE' },
      {
        name: 'keywords',
        content:
          'Sighisoara Festival website, Sighisoara cultural fest, Medieval Festival Sighisoara, Sighisoara event listings, Festival in Sighisoara, Sighisoara arts and culture, Sighisoara festival program, Visit Sighisoara festival, Sighisoara festival tickets, Sighisoara festival experience / Site Festivaluri din Sighișoara, evenimente culturale Sighișoara, sărbători medievale Sighișoara, programul Festivalului Sighișoara Medievala, calendarul evenimentelor Sighișoara, festivalul de artă Sighișoara, festivaluri de vară Sighișoara, evenimente de patrimoniu Sighișoara, spectacole live Sighișoara, momente importante ale festivalurilor din Sighișoara',
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

  public trackPartnerEvent() {
    if (environment.production) {
      const gtmTag = {
        event: 'became_partner', 
        event_category: 'interaction',
        event_label: 'Become Partner Button',
      };
      this.gtag.pushTag(gtmTag);

      gtag('event', 'became_partner', {
        event_category: 'interaction',
        event_label: 'Become Partner Button'
      });
    }
  }
}
