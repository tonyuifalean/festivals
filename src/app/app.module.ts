import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '@environments/environment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';
import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';
import { NgxScrollTopModule } from 'ngx-scrolltop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { httpTranslateLoader, MaterialModule } from './shared';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

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
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
