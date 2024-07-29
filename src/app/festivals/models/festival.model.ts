import { FestivalElement } from '@app/shared';

export interface DataSources {
  [key: string]: FestivalElement[];
}

export interface FestivalModel {
  id: string;
  path: string;
  imageName: string;
  paragraphTotalNo: number;
}
