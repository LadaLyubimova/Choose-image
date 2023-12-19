import {ElementRef, Injectable} from '@angular/core';
import {Ifolder} from "../structure";
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FoldersService {

  constructor() {
  }

  private selectedFolderSubject = new BehaviorSubject<Ifolder>({name: '',type: '', items:[]});
  selectedFolder$ = this.selectedFolderSubject.asObservable();
  currentFolder:Ifolder = {name: this.selectedFolderSubject.value.name,type: '', items:[]};
  clickedElement!:HTMLElement;

  folderSelected(folder:Ifolder){
    this.selectedFolderSubject.next(folder);
    this.currentFolder = folder;
  }

  getFolders() {
    return this.folders.slice();
  }

  private folders: Ifolder[] = [
    {
      name: "Abstract",
      type: "folder",
      items: [
        {
          name: "Abstract_1",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_1.png",
        },
        {
          name: "Abstract_2",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_2.png"
        },
        {
          name: "Abstract_3",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_3.png"
        },
        {
          name: "Abstract_4",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_4.png"
        },
        {
          name: "Abstract_5",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_5.png"
        },
        {
          name: "Abstract_6",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_6.png"
        },
        {
          name: "Abstract_7",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_7.png"
        },
        {
          name: "Abstract_8",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_8.png"
        },
        {
          name: "Abstract_9",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_9.png"
        },
        {
          name: "Abstract_10",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_10.png"
        },
        {
          name: "Abstract_11",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_11.png"
        },
        {
          name: "Abstract_12",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_12.png"
        },
        {
          name: "Abstract_13",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_13.png"
        },
        {
          name: "Abstract_14",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_14.png"
        },
        {
          name: "Abstract_15",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_15.png"
        },
        {
          name: "Abstract_16",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_16.png"
        },
        {
          name: "Abstract_17",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_17.png"
        },
        {
          name: "Abstract_18",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_18.png"
        },
        {
          name: "Abstract_19",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_19.png"
        },
        {
          name: "Abstract_20",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_20.png"
        },
        {
          name: "Abstract_21",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_21.png"
        },
        {
          name: "Abstract_22",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_22.png"
        },
        {
          name: "Abstract_23",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_23.png"
        },
        {
          name: "Abstract_24",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_24.png"
        },
        {
          name: "Abstract_25",
          type: "image",
          url: "/assets/media/images/Abstracts/Abstract_25.png"
        }
      ],
    },
    {
      name: "Animals",
      type: "folder",
      items: [
        {
          name: "Cats",
          type: "folder",
          items: [
            {name: "Animals",
              type: "folder",
              items: [
                {
                  name: "Cat_1",
                  type: "image",
                  url: "/assets/media/images/cats/cat_1.png",
                },
                {
                  name: "cat_2",
                  type: "image",
                  url: "/assets/media/images/cats/cat_2.png"
                },
                {
                  name: "Cat_1",
                  type: "image",
                  url: "/assets/media/images/cats/cat_1.png",
                },
                {
                  name: "cat_2",
                  type: "image",
                  url: "/assets/media/images/cats/cat_9.png"
                },
                {
                  name: "Cat_1",
                  type: "image",
                  url: "/assets/media/images/cats/cat_5.png",
                },
                {
                  name: "cat_2",
                  type: "image",
                  url: "/assets/media/images/cats/cat_7.png"
                }
              ]
            },
            {
              name: "Cat_1",
              type: "image",
              url: "/assets/media/images/cats/cat_1.png",
            },
            {
              name: "cat_2",
              type: "image",
              url: "/assets/media/images/cats/cat_2.png"
            },
            {
              name: "cat_3",
              type: "image",
              url: "/assets/media/images/cats/cat_3.png"
            },
            {
              name: "cat_4",
              type: "image",
              url: "/assets/media/images/cats/cat_4.png"
            },
            {
              name: "cat_5",
              type: "image",
              url: "/assets/media/images/cats/cat_5.png"
            },
            {
              name: "cat_6",
              type: "image",
              url: "/assets/media/images/cats/cat_6.png"
            },
            {
              name: "cat_7",
              type: "image",
              url: "/assets/media/images/cats/cat_7.png"
            },
            {
              name: "cat_8",
              type: "image",
              url: "/assets/media/images/cats/cat_8.png"
            },
            {
              name: "cat_9",
              type: "image",
              url: "/assets/media/images/cats/cat_9.png"
            },
            {
              name: "cat_10",
              type: "image",
              url: "/assets/media/images/cats/cat_10.png"
            },
            {
              name: "cat_11",
              type: "image",
              url: "/assets/media/images/cats/cat_11.png"
            },
            {
              name: "cat_12",
              type: "image",
              url: "/assets/media/images/cats/cat_12.png"
            },
            {
              name: "cat_13",
              type: "image",
              url: "/assets/media/images/cats/cat_13.png"
            },
            {
              name: "cat_14",
              type: "image",
              url: "/assets/media/images/cats/cat_14.png"
            },
            {
              name: "cat_15",
              type: "image",
              url: "/assets/media/images/cats/cat_15.png"
            }
          ]
        },
        {
          name: "Dogs",
          type: "folder",
          items: [
            {
              name: "Dog_1",
              type: "image",
              url: "/assets/media/images/dogs/Dog_1.png",
            },
            {
              name: "Dog_2",
              type: "image",
              url: "/assets/media/images/dogs/Dog_2.png"
            },
            {
              name: "Dog_3",
              type: "image",
              url: "/assets/media/images/dogs/Dog_3.png"
            },
            {
              name: "Dog_4",
              type: "image",
              url: "/assets/media/images/dogs/Dog_4.png"
            },
            {
              name: "Dog_5",
              type: "image",
              url: "/assets/media/images/dogs/Dog_5.png"
            }
          ],
        },
      ],
    },
    {
      name: "Food",
      type: "folder",
      items: [
        {
          name: "Sweet",
          type: "folder",
          items: [
            {
              name: "Sweet_1",
              type: "image",
              url: "/assets/media/images/sweets/Sweet_1.png",
            },
            {
              name: "Sweet_2",
              type: "image",
              url: "/assets/media/images/sweets/Sweet_2.png"
            },
            {
              name: "Sweet_3",
              type: "image",
              url: "/assets/media/images/sweets/Sweet_3.png"
            },
            {
              name: "Sweet_4",
              type: "image",
              url: "/assets/media/images/sweets/Sweet_4.png"
            },
            {
              name: "Sweet_5",
              type: "image",
              url: "/assets/media/images/sweets/Sweet_5.png"
            },
            {
              name: "Sweet_6",
              type: "image",
              url: "/assets/media/images/sweets/Sweet_6.png"
            },
            {
              name: "Sweet_7",
              type: "image",
              url: "/assets/media/images/sweets/Sweet_7.png"
            },
            {
              name: "Sweet_8",
              type: "image",
              url: "/assets/media/images/sweets/Sweet_8.png"
            },
            {
              name: "Sweet_9",
              type: "image",
              url: "/assets/media/images/sweets/Sweet_9.png"
            },
            {
              name: "Sweet_10",
              type: "image",
              url: "/assets/media/images/sweets/Sweet_10.png"
            },
            {
              name: "Sweet_11",
              type: "image",
              url: "/assets/media/images/sweets/Sweet_11.png"
            }
          ],
        },
        {
          name: "Not sweet",
          type: "folder",
          items: [
            {
              name: "Not_sweet_1",
              type: "image",
              url: "/assets/media/images/not_sweets/Not_sweet_1.png",
            },
            {
              name: "Not_sweet_2",
              type: "image",
              url: "/assets/media/images/not_sweets/Not_sweet_2.png",
            },
            {
              name: "Not_sweet_3",
              type: "image",
              url: "/assets/media/images/not_sweets/Not_sweet_3.png",
            },
            {
              name: "Not_sweet_4",
              type: "image",
              url: "/assets/media/images/not_sweets/Not_sweet_4.png",
            },
            {
              name: "Not_sweet_5",
              type: "image",
              url: "/assets/media/images/not_sweets/Not_sweet_5.png",
            },
            {
              name: "Not_sweet_6",
              type: "image",
              url: "/assets/media/images/not_sweets/Not_sweet_6.png",
            },
            {
              name: "Not_sweet_7",
              type: "image",
              url: "/assets/media/images/not_sweets/Not_sweet_7.png",
            },
            {
              name: "Not_sweet_8",
              type: "image",
              url: "/assets/media/images/not_sweets/Not_sweet_8.png",
            },
            {
              name: "Not_sweet_9",
              type: "image",
              url: "/assets/media/images/not_sweets/Not_sweet_9.png",
            },
            {
              name: "Not_sweet_10",
              type: "image",
              url: "/assets/media/images/not_sweets/Not_sweet_10.png",
            },
            {
              name: "Not_sweet_11",
              type: "image",
              url: "/assets/media/images/not_sweets/Not_sweet_11.png",
            },
          ],
        },
      ],
    },
    {
      name: "Interiors",
      type: "folder",
      items: [], // Здесь пока нет элементов
    },
    {
      name: "Plants",
      type: "folder",
      items: [
        {
          name: "Plants_1",
          type: "image",
          url: "/assets/media/images/plants/Plants_1.png",
        },
        {
          name: "Plants_2",
          type: "image",
          url: "/assets/media/images/plants/Plants_2.png"
        },
        {
          name: "Plants_3",
          type: "image",
          url: "/assets/media/images/plants/Plants_3.png"
        },
        {
          name: "Plants_4",
          type: "image",
          url: "/assets/media/images/plants/Plants_4.png"
        },
        {
          name: "Plants_5",
          type: "image",
          url: "/assets/media/images/plants/Plants_5.png"
        },
      ],
    },
    {
      name: "Space",
      type: "folder",
      items: [
        {
          name: "Space_1",
          type: "image",
          url: "/assets/media/images/spaces/Space_1.png",
        },
        {
          name: "Space_2",
          type: "image",
          url: "/assets/media/images/spaces/Space_2.png"
        },
        {
          name: "Space_3",
          type: "image",
          url: "/assets/media/images/spaces/Space_3.png"
        },
        {
          name: "Space_4",
          type: "image",
          url: "/assets/media/images/spaces/Space_4.png"
        },
        {
          name: "Space_5",
          type: "image",
          url: "/assets/media/images/spaces/Space_5.png"
        },
        {
          name: "Space_6",
          type: "image",
          url: "/assets/media/images/spaces/Space_6.png"
        },
        {
          name: "Space_7",
          type: "image",
          url: "/assets/media/images/spaces/Space_7.png"
        },
        {
          name: "Space_8",
          type: "image",
          url: "/assets/media/images/spaces/Space_8.png"
        },
        {
          name: "Space_9",
          type: "image",
          url: "/assets/media/images/spaces/Space_9.png"
        },
        {
          name: "Space_10",
          type: "image",
          url: "/assets/media/images/spaces/Space_10.png"
        },
        {
          name: "Space_11",
          type: "image",
          url: "/assets/media/images/spaces/Space_11.png"
        },
        {
          name: "Space_12",
          type: "image",
          url: "/assets/media/images/spaces/Space_12.png"
        },
        {
          name: "Space_13",
          type: "image",
          url: "/assets/media/images/spaces/Space_13.png"
        },
        {
          name: "Space_14",
          type: "image",
          url: "/assets/media/images/spaces/Space_14.png"
        },
        {
          name: "Space_15",
          type: "image",
          url: "/assets/media/images/spaces/Space_15.png"
        },
        {
          name: "Space_16",
          type: "image",
          url: "/assets/media/images/spaces/Space_16.png"
        },
        {
          name: "Space_17",
          type: "image",
          url: "/assets/media/images/spaces/Space_17.png"
        },
        {
          name: "Space_18",
          type: "image",
          url: "/assets/media/images/spaces/Space_18.png"
        },
        {
          name: "Space_19",
          type: "image",
          url: "/assets/media/images/spaces/Space_19.png"
        },
        {
          name: "Space_20",
          type: "image",
          url: "/assets/media/images/spaces/Space_20.png"
        },
      ],
    },
  ];
}
