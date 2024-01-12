import {ElementRef, HostListener, Injectable} from '@angular/core';
import {Ifolder} from "../structure";
import {BehaviorSubject} from 'rxjs';
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ActivatedRoute, Params, Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class FoldersService {

  constructor(private router:Router, private activateRoute:ActivatedRoute) {
  }
  clickedElement!: HTMLElement;
  breadcrumbsArr:Ifolder[] = [];
  private selectedFolderSubject = new BehaviorSubject<Ifolder>({id: '1', subFolders: [], name: '', type: '', items: []});
  selectedFolder$ = this.selectedFolderSubject.asObservable();
  private breadcrumbsArrSubject = new BehaviorSubject<Ifolder[]>(this.breadcrumbsArr);
  breadcrumbsArr$ = this.breadcrumbsArrSubject.asObservable();
  currentFolder: Ifolder = {id: this.selectedFolderSubject.value.id, subFolders: [], name: this.selectedFolderSubject.value.name, type: '', items: []};


  folderSelected(folder: Ifolder,  event: Event = new Event(''), level:number) {

    // console.log(queryParams);

    // localStorage.setItem('selectFolder', JSON.stringify(folder));
    // localStorage.setItem('selectEvent', JSON.stringify(event));
    // localStorage.setItem('crumbLevel', JSON.stringify(level));
    this.folderBreadcrumbs(level,0,[],folder);
    this.selectedFolderSubject.next(folder);
    this.breadcrumbsArrSubject.next(this.breadcrumbsArr);
    this.currentFolder = folder;

    if (event.target){
      if ((event.target as HTMLElement).tagName === 'P' || 'BUTTON') {
        let el: HTMLElement = document.getElementById(this.currentFolder.id) as HTMLElement;
        el.classList.add('select');
        if (this.clickedElement && this.clickedElement !== el) {
          this.clickedElement.classList.remove('select');
        }
        this.clickedElement = el;
      }
    }
  }

  getFolders() {
    let fold:Ifolder = this.getFolderById('root');
    let arrFolders:Ifolder[] = [];
    fold.subFolders.forEach((folder, index) =>
      {
        arrFolders.push(this.getFolderById(folder));
      }
    );
    return arrFolders;
  }

  getFolderById(id:string) {
  let folder: Ifolder = {id: '', name: '', subFolders: [], items: [], type: 'folder'};
    for (let fold of this.folders){
      if(fold.id === id) {
        folder = fold;
      }
    }
    return folder;
  }

  folderBreadcrumbs(level:number, counter:number=0, arr:Ifolder[] = [], folder:Ifolder){
      for (let fold of this.folders) {
        for (let subFold of fold.subFolders) {
          if (subFold === folder.id) {
            counter ++;
            arr.push(fold);
            if (counter < level) {
            this.folderBreadcrumbs(level, counter, arr, fold)
            }
          }
        }
      }
      arr.push(folder);
      this.breadcrumbsArr = arr.slice(level,arr.length);
  }

  selectCrumb (folder:Ifolder, event: Event = new Event(''), level:number) {
    let i= 1;
    for (let crumb of this.breadcrumbsArr ) {
      if (crumb.id === folder.id){
        break;
      }
      else {
        i++;
      }
    }
    level = i;
    this.folderBreadcrumbs(level,0,[],folder);
    this.folderSelected( folder, event, level);
  }



  private folders: Ifolder[] = [
    {
      id: 'root',
      name: 'root',
      type: 'folder',
      subFolders: ['1','5','6','9','10','11'],
      items: []
    },
    {
      id: '1',
      name: "Abstract",
      type: "folder",
      subFolders: [],
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
      id: '2',
      subFolders: ['3'],
      name: "Cats",
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
      id: '3',
      subFolders: [],
      name: "Animals",
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
      id: '4',
      subFolders: [],
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
      ]
    },
    {
      id: '5',
      subFolders: ['4', '2'],
      name: "Animals",
      type: "folder",
      items: [],
    },
    {
      id: '6',
      subFolders: ['7','8'],
      name: "Food",
      type: "folder",
      items: [],
    },
    {
      id: '7',
      subFolders: [],
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
      id: '8',
      subFolders: [],
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
    {
      id: '9',
      subFolders: [],
      name: "Interiors",
      type: "folder",
      items: [], // Здесь пока нет элементов
    },
    {
      id: '10',
      subFolders: [],
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
      id: '11',
      subFolders: [],
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
