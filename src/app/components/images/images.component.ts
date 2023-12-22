import {Component, ElementRef, HostListener, OnDestroy} from '@angular/core';
import {FoldersService} from "../../folders.service";
import {Ifolder} from "../../../structure";
import {Subscription} from 'rxjs';
import {ImageItemComponent} from "./image-item/image-item.component";
import {NgForOf, NgIf} from "@angular/common";
import {ImagesService} from "../../images.service";

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [
    ImageItemComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './images.component.html',
  styleUrl: './images.component.less'
})
export class ImagesComponent implements OnDestroy {
  folder: Ifolder = {id: '1', subFolders: [], name: '', type: '', items: []};
  private folderSubscription!: Subscription;
  isSelect:boolean = false;

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

  getImages(folder: Ifolder, currentImages: any[] = []) {
    let images = currentImages;
    for (let item of folder.items) {
      if (item.type === 'image') {
        images.push(item);
      }
    }
    for (let index of folder.subFolders){
      this.getImages(this.folderService.getFolderById(index), images)
    }
    return images;
  }

  constructor(private folderService: FoldersService, private imgService:ImagesService, private elRef: ElementRef,) {
    this.folderSubscription = this.folderService.selectedFolder$.subscribe((value) => {
      this.folder = value;
      this.getImages(this.folder);
    });
  }

  ngOnDestroy() {
    this.folderSubscription.unsubscribe();
  }
}
