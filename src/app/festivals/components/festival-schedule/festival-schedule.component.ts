import { Component } from '@angular/core';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

enum DayKey {
  Vineri = 'vineri',
  Sambata = 'sambata',
  Duminica = 'duminica',
}

enum LocationKey {
  PiataMuzeului = 'piataMuzeului',
  PiataCetatii = 'piataCetatii',
  CuloarulBatranelorDoamne = 'culoarulBatranelorDoamne',
  TurnulCizmarilor = 'turnulCizmarilor',
  PiataRatustelor = 'piataRatustelor',
  ZidulCetatii = 'zidulCetatii',
}

@Component({
  selector: 'app-festival-schedule',
  templateUrl: './festival-schedule.component.html',
  styleUrls: ['./festival-schedule.component.scss'],
})
export class FestivalScheduleComponent {
  dayValue = [DayKey.Duminica];
  dayFilterValue = {
    [DayKey.Vineri]: false,
    [DayKey.Sambata]: false,
    [DayKey.Duminica]: true,
  };
  locationValue = [
    LocationKey.PiataMuzeului,
    LocationKey.PiataCetatii,
    LocationKey.CuloarulBatranelorDoamne,
    LocationKey.TurnulCizmarilor,
    LocationKey.PiataRatustelor,
    LocationKey.ZidulCetatii,
  ];
  locationFilterValue: {[key: string]: boolean} = {
    [LocationKey.PiataMuzeului]: true,
    [LocationKey.PiataCetatii]: true,
    [LocationKey.CuloarulBatranelorDoamne]: true,
    [LocationKey.TurnulCizmarilor]: true,
    [LocationKey.PiataRatustelor]: true,
    [LocationKey.ZidulCetatii]: true,
  };
  translationKeyPrefix: string = 'FESTIVAL.LIST.FESTIVAL_1.SCHEDULE.';

  readonly dayKey = DayKey;
  readonly locationKey = LocationKey;

  constructor(
    public translate: TranslateService,
    private gtag: GoogleTagManagerService,
  ) {
    if (environment.production) {
      const gtmTag = {
        event: 'page',
        page_title: 'Festival Schedule',
        page_location: 'https://sighisoarafestival.com/festivals/festival-details'
      };
      this.gtag.pushTag(gtmTag);
    }
  }

  filterByDay(key: DayKey, value: boolean) {
    this.dayFilterValue[key] = value;
    if (value) {
      this.dayValue = [...this.dayValue, key];
    } else {
      this.dayValue = this.dayValue.filter((option: DayKey) => option !== key);
    }

    if (environment.production) {
      const gtmTag = {
        event: 'Filter by Day - Desktop',
      };
      this.gtag.pushTag(gtmTag);
    }
  }

  updateFilterByDayValue(selectedOptions: DayKey[]) {
    for (const key in this.dayFilterValue) {
      const newValue = selectedOptions.includes(key as unknown as DayKey) ? true : false;
      this.dayFilterValue[key as unknown as DayKey] = newValue;
    }

    if (environment.production) {
      const gtmTag = {
        event: 'Filter by Day - Mobile',
      };
      this.gtag.pushTag(gtmTag);
    }
  }

  filterByLocation(key: LocationKey, value: boolean) {
    this.locationFilterValue[key] = value;
    if (value) {
      this.locationValue = [...this.locationValue, key];
    } else {
      this.locationValue = this.locationValue.filter((option: LocationKey) => option !== key);
    }

    if (environment.production) {
      const gtmTag = {
        event: 'Filter by Location - Desktop',
      };
      this.gtag.pushTag(gtmTag);
    }
  }

  updateFilterByLocationValue(selectedOptions: LocationKey[]) {
    for (const key in this.locationFilterValue) {
      const newValue = selectedOptions.includes(key as unknown as LocationKey) ? true : false;
      this.locationFilterValue[key as unknown as LocationKey] = newValue;
    }

    if (environment.production) {
      const gtmTag = {
        event: 'Filter by Location - Desktop',
      };
      this.gtag.pushTag(gtmTag);
    }
  }
}
