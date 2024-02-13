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

export interface foldersAndImagesObject {
  entities: [];
  entitiesCount: number;
  folders: folder[];
  id:string;
}

export interface folder {
  customFields: {};
  hasChildren: boolean;
  id: string;
  lastModified: string;
  name: string;
  ownerId: string;
  path: string;
  private: boolean;
}

export interface entity {
   "metadata": {
   "isVector": boolean,
     "width": number,
     "height": number,
     "format": string,
     "dpiX": string,
     "dpiY": string,
     "pages": []
 },
   "private": boolean,
   "mimeType": string,
   "previews": {
   "backoffice-preview": {
     "id": string,
       "name": string,
       "namespace": string,
       "width": number,
       "height": number,
       "url": string
   }
 },
   "size": number,
   "folderId": string,
   "tenantId": number,
   "id": string,
   "ownerId": string,
   "name": string,
   "customFields": {},
   "lastModified": string
}
