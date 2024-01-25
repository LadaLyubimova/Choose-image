 export interface Iimage {
  name: string;
  type: string;
  url: string;
}


export interface Ifolder {
  id: string;
  name: string;
  type: string;
  items: Iimage[];
  path: string;
}
