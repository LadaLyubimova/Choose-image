import {Injectable} from '@angular/core';
import {entity, folder, foldersAndImagesObject, Ifolder} from "../structure";
import {BehaviorSubject, map, Observable, Subject, tap} from 'rxjs';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class FoldersService {

    dummyFolder: folder = {
        customFields: {},
        hasChildren: false,
        id: '1',
        lastModified: '',
        name: 'Folder',
        ownerId: '1',
        path: '/',
        private: false,
    }
    selectedFolderSubject = new BehaviorSubject<folder>(this.dummyFolder);
    selectedFolder$ = this.selectedFolderSubject.asObservable();
    breadcrumbsArr: folder[] = [];
    private entitiesSubject: Subject<entity[]> = new Subject();
    entities$ = this.entitiesSubject.asObservable();
    private breadcrumbsArrSubject = new BehaviorSubject<folder[]>(this.breadcrumbsArr);
    breadcrumbsArr$ = this.breadcrumbsArrSubject.asObservable();
    entities: entity[] = [];

    foldersNew: folder[] = [];

    constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient) {
    }

    getFolders(fullPath: string, triggering: string = "No message") {

        const headers = new HttpHeaders({}).set('accept', 'application/json');
        const params = new HttpParams().set('tenantId', '10231').set('fullPath', fullPath);

        return this.http.get<foldersAndImagesObject>('https://apigateway-devenv.azurewebsites.net/api/storage/v1/images/folders', {
            headers: headers,
            params: params
        }).pipe(
            tap(folders => {
                if (triggering === "APP_FOLDERS") {
                    folders.folders.forEach(value => {
                        this.setFolder(value);
                    })
                }
                if (triggering === "APP_COMPONENT") {
                    this.entities = [];
                    this.getEntities(folders);
                    this.selectedFolderSubject.next(this.findFolder(fullPath));
                }
                if (triggering === "GET_ENTITIES") {
                    this.entities.push(...folders.entities);
                }
            }));
    }

    setFolder(folder: folder) {
        let find: boolean = false;
        this.foldersNew.forEach(value => {
            if (value.id === folder.id) {
                find = true;
            }
        })
        if (!find) {
            this.foldersNew.push(folder);
        }
    }

    getEntities(objFoldAndImg: foldersAndImagesObject) {
        if (objFoldAndImg.folders.length > 0) {
            objFoldAndImg.folders.forEach(value => {
                this.getFolders(value.path + value.name + '/', "GET_ENTITIES").subscribe();
            });
        } else {
            this.entities.push(...objFoldAndImg.entities);
        }
        this.entitiesSubject.next(this.entities);
    }

    redirectionToFolderPath(folder: folder) {
        const queryParams: Params = {path: folder.path + folder.name + '/'};
        this.router.navigate([], {relativeTo: this.activateRoute, queryParams, queryParamsHandling: "merge"})
    }

    getSubFolders(fullPath: string) {
        let arrSub: Observable<folder[]>;
        arrSub = this.getFolders(fullPath).pipe(
            map(
                (obj) =>
                    obj.folders
            ));
        return arrSub;
    }

    pushBreadcrumbsInArray(folder: folder) {
        let foldArr: folder[] = [];
        const arrFoldersName = folder.path.split('/');
        arrFoldersName.push(folder.name);
        const filteredFolders = arrFoldersName.filter(el => el !== '');

        console.log(filteredFolders);

        let path = '/';
        filteredFolders.forEach((value, index) => {
            path = path + value + '/';
            if (path !== '') {
                foldArr.push(this.findFolder(path));
            }
            if (index === filteredFolders.length) {
                path = '';
            }
        });
        console.log(path);
        this.breadcrumbsArrSubject.next(foldArr);
    }


    selectCrumb(folder: folder) {
        this.redirectionToFolderPath(folder);
    }

    findFolder(path: string) {
        let fold!: folder;
        this.foldersNew.forEach(value => {
            if (value.path + value.name + '/' === path) {
                console.log(path);
                fold = value;
            }
        })
        return fold;
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
