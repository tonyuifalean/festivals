import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '@environments/environment';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';
import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { firstValueFrom } from 'rxjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { httpTranslateLoader, MaterialModule } from './shared';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'sighisoarafestival.com',
  },
  position: 'bottom-left',
  theme: 'classic',
  palette: {
    popup: {
      background: '#412526',
      text: '#FFFFFF',
      link: '#FFFFFF',
    },
    button: {
      background: '#FFFFFF',
      text: '#000000',
      border: 'transparent',
    },
  },
  type: 'info',
  content: {
    message:
      'This website uses cookies to ensure you get the best experience on our website.',
    dismiss: 'Got it!',
    deny: 'Refuse cookies',
    link: 'Learn more',
    href: 'https://cookiesandyou.com',
    policy: 'Cookie Policy',
  },
};

export function initializeApp(translate: TranslateService) {
  translate.addLangs(['en', 'ro']);
  translate.setDefaultLang('en');

  return (): Promise<any> =>
    firstValueFrom(translate.use('en'));
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    GoogleTagManagerModule.forRoot({
      id: environment.gaTrackingId,
    }),
    HttpClientModule,
    MaterialModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    NgxScrollTopModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    provideAnimationsAsync(),
    provideClientHydration(
      withHttpTransferCacheOptions({
        includePostRequests: true,
      })
    ),
    provideHttpClient(withFetch()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [TranslateService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
