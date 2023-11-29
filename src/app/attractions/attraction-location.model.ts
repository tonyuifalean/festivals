export interface AttractionLocationModel {
  id: string;
  label: {
    color: string;
    text: string;
  },
  info: {
    title: string;
    link: string;
  };
  options: {
    animation: google.maps.Animation;
  };
  position: {
    lat: number;
    lng: number;
  };
}
