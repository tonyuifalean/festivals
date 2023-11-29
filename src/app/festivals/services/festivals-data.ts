import { FestivalElement } from "@app/shared";
import { DataSources, FestivalModel } from "../models";

export const FESTIVAL_LIST_GROUP_BY_YEAR: DataSources = {
  '2022': [
    {
      id: '1',
      festivalName: 'Sighișoara Medievala',
      startDate: '07/29',
      endDate: '07/31',
    },
    {
      id: '2',
      festivalName: 'Blues Sighișoara',
      startDate: '09/09',
      endDate: '09/10',
    },
  ],
  '2021': [
    {
      id: '1',
      festivalName: 'Sighișoara Medievala',
      startDate: '07/30',
      endDate: '08/01',
    },
    {
      id: '2',
      festivalName: 'Blues Sighișoara',
      startDate: '09/10',
      endDate: '09/11',
    },
  ],
  '2020': [
    {
      id: '3',
      festivalName: 'Dava Sighișoara',
      startDate: '08/28',
      endDate: '08/30',
    },
  ],
  '2019': [
    {
      id: '1',
      festivalName: 'Sighișoara Medievala',
      startDate: '07/26',
      endDate: '07/28',
    },
    {
      id: '2',
      festivalName: 'Blues Sighișoara',
      startDate: '03/29',
      endDate: '09/30',
    },
    {
      id: '4',
      festivalName: 'ProEtnica Sighișoara',
      startDate: '08/21',
      endDate: '08/25',
    },
    {
      id: '5',
      festivalName: 'Festivalul Fanfarelor',
      startDate: '09/01',
      endDate: '09/01',
    },
  ],
};

export const FESTIVALS: FestivalModel[] = [
  {
    id: '1',
    imageName: 'medieval.jpg',
    paragraphTotalNo: 13,
  },
  {
    id: '2',
    imageName: 'blues.jpg',
    paragraphTotalNo: 5,
  },
  {
    id: '3',
    imageName: 'proetnica.jpg',
    paragraphTotalNo: 4,
  },
  {
    id: '4',
    imageName: 'brass_band.jpg',
    paragraphTotalNo: 1,
  }
];

export const getFestivalById = (id: string): FestivalModel | undefined => {
  return FESTIVALS.find((item) => item.id === id);
}

