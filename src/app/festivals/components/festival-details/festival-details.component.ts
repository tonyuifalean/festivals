import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { FestivalModel } from '../../models';
import { FestivalsService } from '../../services';
import { FestivalLocationModel } from './festival-location.model';
import { FESTIVAL_LOCATIONS } from './festival-location.data';

@Component({
  selector: 'app-festival-details',
  templateUrl: './festival-details.component.html',
  styleUrls: ['./festival-details.component.scss']
})
export class FestivalDetailsComponent implements OnInit, AfterViewInit {

  festivalData$!: Observable<FestivalModel | undefined>;
  locations: FestivalLocationModel[] = FESTIVAL_LOCATIONS;

  constructor(
    public translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private festivalsService: FestivalsService,
    private gtag: GoogleTagManagerService,
  ) {
    if (environment.production) {
      const gtmTag = {
        event: 'page',
        page_title: 'Festival Details',
        page_location: 'https://sighisoarafestival.com/festivals/festival-details'
      };
      this.gtag.pushTag(gtmTag);
    }
  }

  ngOnInit(): void {
    this.festivalData$ = this.activatedRoute.params.pipe(
      switchMap((params) => {
        return this.festivalsService.getFestival(params.id)
      })
    );
  }

  ngAfterViewInit(): void {
    this.festivalData$.pipe(take(1)).subscribe((festivalData: FestivalModel | undefined) => {
      console.log(festivalData);
      if (festivalData?.id === '1') {
        setTimeout(() => this.scrollToSchedule(), 500);
      }
    })
  }

  getFestivalPagragraphs(paragraphTotalNo: number) {
   return Array.from({ length: paragraphTotalNo }, (_, i) => i + 1);
  }

  scrollToSchedule() {
    const el = document.getElementById('festivalSchedule');
    el?.scrollIntoView({ behavior: "smooth", block: "start" });

    if (environment.production) {
      const gtmTag = {
        event: 'Scroll to Schedule',
      };
      this.gtag.pushTag(gtmTag);
    }
  }
}
