 export interface Iimage {
  name: string;
  type: string;
  url: string;
}


export interface Ifolder {
  name: string;
  type: string;
  items: (Ifolder | Iimage)[];
}
