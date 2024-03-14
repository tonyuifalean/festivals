import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { take } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { FestivalsService } from '../../services';
import { FestivalModel } from '../../models';

@Component({
  selector: 'app-festival-list',
  templateUrl: './festival-list.component.html',
  styleUrls: ['./festival-list.component.scss'],
  animations: [
    trigger('card', [
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
export class FestivalListComponent implements OnInit {
  // isLoading = true;
  // displayedColumns: TableColumnItem[] = [
  //   { name: 'festivalName', title: 'FESTIVAL.NAME', sortable: true },
  //   { name: 'startDate', title: 'FESTIVAL.START_DATE', sortable: true },
  //   { name: 'endDate', title: 'FESTIVAL.END_DATE', sortable: true },
  //   { name: 'view', title: 'FESTIVAL.VIEW', sortable: true },
  // ];
  // allDataSources!: DataSources;
  // years: string[] = [];
  // defaultYear = '';
  // dataSource: FestivalElement[] = [];
  festivals: FestivalModel[] = [];

  constructor(
    public translate: TranslateService,
    private festivalsService: FestivalsService,
    private gtag: GoogleTagManagerService,
    private router: Router,
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.festivalsService
      .getFestivalList()
      .pipe(
        take(1)
        // finalize(() => setTimeout(() => (this.isLoading = false), 500))
      )
      .subscribe((festivals: FestivalModel[]) => {
        // Display the first 3 festivals for now
        this.festivals = festivals.slice(0, 3);
        // this.years = Object.keys(sources);
        // if (this.years.length) {
        //   this.defaultYear = this.years[0];
        //   this.updateList(this.defaultYear);
        // }
      });

    this.meta.addTags([
      {
        name: 'description',
        content:
          "Discover the Festivals of Sighisoara page, your gateway to the enchanting celebrations in Romania's medieval gem. Uncover the charm of Sighisoara's festivals, including the famous Medieval Festival, through detailed guides, stunning images, and the latest event information. Dive into the heart of Sighisoara's cultural vibrancy and plan your festive journey with ease.",
      },
      { name: 'author', content: 'VEEZBLE' },
      {
        name: 'keywords',
        content:
          'Sighisoara festivals, Medieval Festival Sighisoara, Sighisoara events, Cultural festivals Sighisoara, Sighisoara annual celebrations, Sighisoara festival guide, Upcoming festivals Sighisoara, Sighisoara music festivals, Traditional festivals Sighisoara, Sighisoara festival dates',
      },
    ]);
    this.title.setTitle('Festivals - Sighisoara Festival');

    if (environment.production) {
      const gtmTag = {
        event: 'page',
        page_title: 'Festivals',
        page_location: 'https://sighisoarafestival.com/festivals',
      };
      this.gtag.pushTag(gtmTag);
    }
  }

  // updateList(year: string) {
  //   if (!!this.allDataSources && !!this.allDataSources[year]) {
  //     this.dataSource = this.allDataSources[year];
  //   }
  // }

  openFestival(festivalId: string) {
    this.router.navigate([`${this.router.url}/festival-details/${festivalId}`]);
  }
}
