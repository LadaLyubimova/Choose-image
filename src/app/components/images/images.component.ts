import {Component, ElementRef, HostListener, OnDestroy} from '@angular/core';
import {FoldersService} from "../../folders.service";
import {Ifolder, Iimage} from "../../../structure";
import {map, Observable, Subscription} from 'rxjs';
import {ImageItemComponent} from "./image-item/image-item.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ImagesService} from "../../images.service";

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [
    ImageItemComponent,
    NgIf,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './images.component.html',
  styleUrl: './images.component.less'
})
export class ImagesComponent implements OnDestroy {
  folder: Ifolder = {id: '1', subFolders: [], name: '', type: '', items: []};
  images$:Observable<Iimage[]> = this.folderService.selectedFolder$.pipe(map(value =>this.getImages(value)))
  private folderSubscription!: Subscription;

  constructor( public folderService: FoldersService, private imgService:ImagesService, private elRef: ElementRef,) {
    this.folderSubscription = this.folderService.selectedFolder$.subscribe((value) => {
      this.folder = value;
      this.getImages(this.folder);
    });
  }

  @HostListener('click', ['$event']) click(event:Event) {
    const targetElement = event.target as HTMLElement;
    if (targetElement.classList.contains('image')) {
      // console.log('Это картинка!');
      this.imgService.setImageSelect(true);
    }
    else {
      this.imgService.setImageSelect(false);
      // console.log('Это не картинка!');
    }

  };

  getImages(folder: Ifolder | null, currentImages: any[] = []) {
    let images = currentImages;
    if (typeof (folder) !== null){
    for (let item of (folder as Ifolder).items ) {
      if (item.type === 'image') {
        images.push(item);
      }
    }
    for (let index of (folder as Ifolder).subFolders){
      this.getImages(this.folderService.getFolderById(index), images)
    }
    }
    return images;
  }

  ngOnDestroy() {
    this.folderSubscription.unsubscribe();
  }
}
