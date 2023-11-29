export interface AccomodationModel {
  id: string;
  address: string;
  label: {
    color: string;
    text: string;
  };
  imgName: string;
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
