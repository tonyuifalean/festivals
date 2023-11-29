import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FestivalElement } from '@app/shared';
import { environment } from '@environments/environment';
import { DataSources, FestivalModel } from '../models';
import { FESTIVALS, FESTIVAL_LIST_GROUP_BY_YEAR, getFestivalById } from './festivals-data';

@Injectable({
  providedIn: 'root',
})
export class FestivalsService {
  constructor(private http: HttpClient) {}

  getFestivals(): Observable<DataSources> {
    return of(FESTIVAL_LIST_GROUP_BY_YEAR);
    // return <Observable<DataSources>>(
    //   this.http.get(`${environment.backEndUrl}/festivals`)
    // );
  }

  getFestivalList(): Observable<FestivalModel[]> {
    return of(FESTIVALS);
  }

  getFestival(id: string): Observable<FestivalModel | undefined> {
    return of(getFestivalById(id));
    // return <Observable<FestivalElement>>(
    //   this.http.get(`${environment.backEndUrl}/festivals/${id}`)
    // );
  }
}
