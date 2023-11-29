import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';

import { FestivalsService } from '../../services';
import { FestivalModel } from '../../models';
import { environment } from '@environments/environment';
import { Gtag } from 'angular-gtag';

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
    private gtag: Gtag,
    private router: Router,
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.festivalsService
      .getFestivalList()
      .pipe(
        take(1),
        // finalize(() => setTimeout(() => (this.isLoading = false), 500))
      )
      .subscribe((festivals: FestivalModel[]) => {
        this.festivals = festivals;
        // this.years = Object.keys(sources);
        // if (this.years.length) {
        //   this.defaultYear = this.years[0];
        //   this.updateList(this.defaultYear);
        // }
      });

    this.meta.addTags([
      { name: 'description', content: 'Festivals in Sighișoara' },
      { name: 'author', content: 'VEEZBLE SRL' },
      {
        name: 'keywords',
        content: 'Sighișoara, Festival, Medieval, Transylvania',
      },
    ]);
    this.title.setTitle('Festivals - SighișoaraFestival');

    if (environment.production) {
      this.gtag.pageview({
        page_title: 'Festivals',
        page_path: '/festivals',
        page_location: 'https://sighisoarafestival.com/festivals'
      });
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
