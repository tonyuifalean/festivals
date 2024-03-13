import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  NgcCookieConsentService,
  NgcInitializationErrorEvent,
  NgcInitializingEvent,
  NgcNoCookieLawEvent,
  NgcStatusChangeEvent,
} from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';
import { AuthenticationService, User } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  mobileQuery: MediaQueryList;

  fillerNav = [
    {
      name: 'MENU.HOME',
      route: 'home',
    },
    {
      name: 'MENU.FESTIVALS',
      route: 'festivals',
    },
    // {
    //   name: 'MENU.NEWS',
    //   route: 'news',
    // },
    {
      name: 'MENU.ATTRACTIONS',
      route: 'attractions',
    },
    {
      name: 'MENU.ACCOMODATIONS',
      route: 'accomodations',
    },
    {
      name: 'MENU.RESTAURANTS',
      route: 'restaurants',
    },
    {
      name: 'MENU.BLOG',
      route: 'blog',
    },
  ];
  public currentUser: User = {};
  public language: 'en' | 'ro' = 'en';
  public isAdminRoute = false;
  public isHomeRoute = false;
  private _mobileQueryListener: () => void;

  //keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription!: Subscription;
  private popupCloseSubscription!: Subscription;
  private initializingSubscription!: Subscription;
  private initializedSubscription!: Subscription;
  private initializationErrorSubscription!: Subscription;
  private statusChangeSubscription!: Subscription;
  private revokeChoiceSubscription!: Subscription;
  private noCookieLawSubscription!: Subscription;

  constructor(
    public translate: TranslateService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private authenticationService: AuthenticationService,
    private metatagService: Meta,
    private router: Router,
    private ccService: NgcCookieConsentService,
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    // list of available languages
    translate.addLangs(['en', 'ro']);

    // language that will be used by default
    translate.setDefaultLang(this.language);

    this.updateCookieTranslation();

    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );

    this.translate
      .get(['cookie.message', 'cookie.dismiss', 'cookie.link'])
      .subscribe((data) => {
        this.ccService.getConfig().content = {
          message: data['cookie.message'],
          dismiss: data['cookie.dismiss'],
          link: data['cookie.link'],
        };

        this.ccService.destroy(); //remove previous cookie bar (with default messages)
        this.ccService.init(this.ccService.getConfig()); // update config with translated messages
      });
  }

  ngOnInit(): void {
    // Needed to display Login link if the route contains admin
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isAdminRoute = event.url.includes('admin');
        this.isHomeRoute = event.url.includes('home');
      }
    });

    // Add tags for SEO purpose
    this.metatagService.addTags([
      {
        name: 'keywords',
        content: 'Sighișoara, Festival, Medieval, Transylvania',
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'VEEZBLE SRL' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2022-05-01', scheme: 'YYYY-MM-DD' },
      { name: 'charset', content: 'UTF-8' },
    ]);

    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(() => {
      // you can use this.ccService.getConfig() to do stuff...
    });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(() => {
      // you can use this.ccService.getConfig() to do stuff...
    });

    this.initializingSubscription = this.ccService.initializing$.subscribe(
      (event: NgcInitializingEvent) => {
        // the cookieconsent is initilializing... Not yet safe to call methods like `NgcCookieConsentService.hasAnswered()`
        console.log(`initializing: ${JSON.stringify(event)}`);
      }
    );

    this.initializedSubscription = this.ccService.initialized$.subscribe(() => {
      // the cookieconsent has been successfully initialized.
      // It's now safe to use methods on NgcCookieConsentService that require it, like `hasAnswered()` for eg...
      console.log(`initialized: ${JSON.stringify(event)}`);
    });

    this.initializationErrorSubscription =
      this.ccService.initializationError$.subscribe(
        (event: NgcInitializationErrorEvent) => {
          // the cookieconsent has failed to initialize...
          console.log(
            `initializationError: ${JSON.stringify(event.error?.message)}`
          );
        }
      );

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );

    this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );
  }

  /**
   * Translate the language constants to the given language
   */
  switchLang(): void {
    this.language = this.language === 'en' ? 'ro' : 'en';
    this.translate.use(this.language);

    this.updateCookieTranslation();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);

    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializingSubscription.unsubscribe();
    this.initializedSubscription.unsubscribe();
    this.initializationErrorSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  updateCookieTranslation() {
    this.translate
      .get(['cookie.message', 'cookie.dismiss', 'cookie.link'])
      .subscribe((data) => {
        this.ccService.getConfig().content = {
          message: data['cookie.message'],
          dismiss: data['cookie.dismiss'],
          link: data['cookie.link'],
        };

        this.ccService.destroy(); //remove previous cookie bar (with default messages)
        this.ccService.init(this.ccService.getConfig()); // update config with translated messages
      });
  }
}

/**  Copyright 2021 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
