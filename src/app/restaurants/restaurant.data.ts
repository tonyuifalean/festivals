import { RestaurantModel } from "./restaurant.model";


export const RESTAURANTS: RestaurantModel[] = [
  {
    id: '1',
    address: "Str. Bastionului, Nr. 10",
    // Data below is needed for Google Maps pins
    label: {
      color: '#230E11',
      text: 'Casa Joseph Haydn',
    },
    imgName: "casa_joseph_haydn.jpg",
    info: {
      title: 'Casa Joseph Haydn',
      link: 'https://g.page/casajosephhaydnwineandcuisine?share',
    },
    options: {
      // animation: google.maps.Animation.BOUNCE,
    },
    position: {
      lat: 46.22069948681924,
      lng: 24.792716023823544,
    },
  },
  {
    id: '2',
    address: "Str. Bastionului, Nr. 11",
    // Data below is needed for Google Maps pins
    label: {
      color: '#230E11',
      text: 'Casa Georgius Krauss',
    },
    imgName: "casa_georgius_krauss.jpg",
    info: {
      title: 'Casa Georgius Krauss',
      link: 'https://goo.gl/maps/HKHeSn7gp6ufCTsFA',
    },
    options: {
      // animation: google.maps.Animation.BOUNCE,
    },
    position: {
      lat: 46.22095377882968,
      lng: 24.792666127284637,
    },
  },
  {
    id: '3',
    address: 'Str. Octavian Goga, Nr. 3',
    // Data below is needed for Google Maps pins
    label: {
      color: '#230E11',
      text: 'Ferdinand Bistro-Gourmet',
    },
    imgName: "ferdinand_bistro_gourmet.jpg",
    info: {
      title: 'Ferdinand Bistro-Gourmet',
      link: 'https://goo.gl/maps/DNUGCXZ6tMiV8jYU8',
    },
    options: {
      // animation: google.maps.Animation.BOUNCE,
    },
    position: {
      lat: 46.218894403148795,
      lng: 24.794120666182728,
    },
  },
];
