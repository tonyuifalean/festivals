import { AccomodationModel } from "./accomodation.model";

export const ACCOMODATIONS: AccomodationModel[] = [
  {
    id: '1',
    address: "Str. Bastionului, Nr. 11",
    // Data below is needed for Google Maps pins
    label: {
      color: '#502233',
      text: 'Casa Georgius Krauss',
    },
    imgName: "casa_georgius_krauss.jpg",
    info: {
      title: 'Casa Georgius Krauss',
      link: 'https://goo.gl/maps/HKHeSn7gp6ufCTsFA',
    },
    options: {
      animation: google.maps.Animation.BOUNCE,
    },
    position: {
      lat: 46.22095377882968,
      lng: 24.792666127284637,
    },
  },
  {
    id: '2',
    address: "Str. Bastionului, Nr. 10",
    // Data below is needed for Google Maps pins
    label: {
      color: '#502233',
      text: 'Casa Joseph Haydn',
    },
    imgName: "casa_joseph_haydn.jpg",
    info: {
      title: 'Casa Joseph Haydn',
      link: 'https://g.page/casajosephhaydnwineandcuisine?share',
    },
    options: {
      animation: google.maps.Animation.BOUNCE,
    },
    position: {
      lat: 46.22069948681924,
      lng: 24.792716023823544,
    },
  },
];
