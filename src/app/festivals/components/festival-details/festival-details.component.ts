import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { FestivalModel } from '../../models';
import { FestivalsService } from '../../services';
import { FestivalLocationModel } from './festival-location.model';
import { FESTIVAL_LOCATIONS } from './festival-location.data';
import { Gtag } from 'angular-gtag';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-festival-details',
  templateUrl: './festival-details.component.html',
  styleUrls: ['./festival-details.component.scss']
})
export class FestivalDetailsComponent implements OnInit {

  festivalData$!: Observable<FestivalModel | undefined>;
  locations: FestivalLocationModel[] = FESTIVAL_LOCATIONS;

  constructor(
    public translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private festivalsService: FestivalsService,
    private gtag: Gtag,
  ) {
    if (environment.production) {
      this.gtag.pageview({
        page_title: 'Festival Details',
        page_path: '/festivals/festival-details',
        page_location: 'https://sighisoarafestival.com/festivals/festival-details'
      });
    }
  }

  ngOnInit(): void {
    this.festivalData$ = this.activatedRoute.params.pipe(
      switchMap((params) => {
        return this.festivalsService.getFestival(params.id)
      })
    );
  }

  getFestivalPagragraphs(paragraphTotalNo: number) {
   return Array.from({ length: paragraphTotalNo }, (_, i) => i + 1);
  }

  scrollToSchedule() {
    const el = document.getElementById('festivalSchedule');
    el?.scrollIntoView({ behavior: "smooth", block: "start" });

    if (environment.production) {
      this.gtag.event('Scroll to Schedule');
    }
  }
}
