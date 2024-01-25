import {Injectable} from '@angular/core';
import {Ifolder} from "../structure";
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute, Params, Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class FoldersService {

  dummyFolder:Ifolder={id: '1', name: '', type: '', items: [], path: ''}
  clickedElement!: HTMLElement;
  breadcrumbsArr:Ifolder[] = [];
  private selectedFolderSubject = new BehaviorSubject<Ifolder>(this.dummyFolder);
  selectedFolder$ = this.selectedFolderSubject.asObservable();
  private breadcrumbsArrSubject = new BehaviorSubject<Ifolder[]>(this.breadcrumbsArr);
  breadcrumbsArr$ = this.breadcrumbsArrSubject.asObservable();
  currentFolder: Ifolder = {id: this.selectedFolderSubject.value.id, name: this.selectedFolderSubject.value.name, type: '', items: [], path: ''};

  constructor(private router:Router, private activateRoute:ActivatedRoute) {
  }

  folderSelected(folder: Ifolder,  event: Event = new Event('')) {
    if (event.type === 'queryParams' && event.target=== null) {
      this.setCurrentFolder(folder);
    }
    if (event.target)
    {
      if (((event.target) as HTMLElement).tagName === 'P') {
        console.log('crumb');
        this.redirectionToFolderPath(folder);
        this.setCurrentFolder(folder);
      }
    }
    this.setClasses();
  }

  setCurrentFolder(folder: Ifolder) {
    this.currentFolder = folder;
    this.folderBreadcrumbs(folder);
    this.selectedFolderSubject.next(folder);
    this.breadcrumbsArrSubject.next(this.breadcrumbsArr);
    // this.setClasses();

  }

  setClasses() {
    if (typeof document !== 'undefined'){
      let el: HTMLElement = document.getElementById(this.currentFolder.id) as HTMLElement;
      el.classList.add('select');
      if (this.clickedElement && this.clickedElement !== el) {
        this.clickedElement.classList.remove('select');
      }
      if (this.clickedElement && this.clickedElement === el) {
        this.clickedElement.classList.add('select');
      }
      this.clickedElement =  el;
    }
  }

  getFolders() {
    let folder:Ifolder = this.getFolderByPath('/');
    let arrSub:Ifolder[] =[];
    this.folders.forEach((fold)=> {
      let path = fold.path.slice(0, -(fold.name).length)
      // console.log(path);
      if (path === folder.path) {
        arrSub.push(fold);
      }
    })
    return arrSub;
  }

  redirectionToFolderPath (folder:Ifolder) {
    const queryParams:Params = {path: folder.path};
    this.router.navigate([],{relativeTo: this.activateRoute, queryParams, queryParamsHandling:"merge"})
  }

  getFolderByPath(path: string) {
    let folder!:Ifolder;
      for (let fold of this.folders){
        if(fold.path === path) {
          folder = fold;
        }
      }
    return folder? folder : this.dummyFolder;
  }

  getSubFolders (folder:Ifolder) {
    let arrSub:Ifolder[] =[];
    this.folders.forEach((fold)=> {
      let len = fold.name.length;
      let parentPath = fold.path.slice(0, -len - 1);
      if (folder.path === parentPath) {
        arrSub.push(fold);
      }
    })
    return arrSub;
}

  folderBreadcrumbs(folder:Ifolder){
    this.breadcrumbsArr = [];
    let pathArr:string = '';
    const arrFoldersFromPath = folder.path.split('/');
    arrFoldersFromPath.forEach((fold, index)=>{
      pathArr =pathArr + '/' + arrFoldersFromPath[index] ;
      // console.log(pathArr);
      this.breadcrumbsArr.push( this.getFolderByNameAndPath(fold, pathArr.slice(2, pathArr.length)));
    });
    this.breadcrumbsArr = this.breadcrumbsArr.slice(1,this.breadcrumbsArr.length);
  }

  getFolderByNameAndPath(name:string, path:string) {
    path = '/' + path;
    // console.log(path);
    let folder: Ifolder = this.dummyFolder;
    for (let fold of this.folders){
      if(fold.name === name && fold.path === path) {
        // console.log(path);
        folder = fold;
        return folder;
      }
    }
    return folder;
  }

  selectCrumb (folder:Ifolder, event: Event = new Event('crumbs')) {
    this.folderBreadcrumbs(folder);
    this.folderSelected( folder, event);
  }



  private folders: Ifolder[] = [
    {
      id: 'root',
      name: 'root',
      type: 'folder',
      items: [],
      path: '/'
    },
    {
      id: '1',
      name: "Abstract",
      type: "folder",
      path: '/Abstract',
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
      name: "Cats",
      type: "folder",
      path: '/Animals/Cats',
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
      name: "Animals2",
      type: "folder",
      path: '/Animals/Cats/Animals2',
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
      name: "Dogs",
      type: "folder",
      path: '/Animals/Dogs',
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
      name: "Animals",
      type: "folder",
      path: '/Animals',
      items: [],
    },
    {
      id: '6',
      name: "Food",
      type: "folder",
      path: '/Food',
      items: [],
    },
    {
      id: '7',
      name: "Sweet",
      type: "folder",
      path: '/Food/Sweet',
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
      name: "Not sweet",
      type: "folder",
      path: '/Food/Not sweet',
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
      name: "Interiors",
      type: "folder",
      path: '/Interiors',
      items: [], // Здесь пока нет элементов
    },
    {
      id: '10',
      name: "Plants",
      type: "folder",
      path: '/Plants',
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
      name: "Space",
      type: "folder",
      path: '/Space',
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
