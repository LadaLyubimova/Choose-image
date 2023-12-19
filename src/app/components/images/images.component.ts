import {Component, OnDestroy} from '@angular/core';
import {FoldersService} from "../../folders.service";
import {Ifolder} from "../../../structure";
import {Subscription} from 'rxjs';
import {ImageItemComponent} from "./image-item/image-item.component";
import {NgForOf, NgIf} from "@angular/common";

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
  folder: Ifolder = {name: '', type: '', items: []};
  private folderSubscription!: Subscription;

  getImages(folder: Ifolder, currentImages: any[] = []) {
    let images = currentImages;
    for (let item of folder.items) {
      if (item.type === 'image') {
        images.push(item);
      }
      else {
        this.getImages(item as Ifolder, images)
      }
    }
    return images;
  }

  constructor(private folderService: FoldersService) {
    this.folderSubscription = this.folderService.selectedFolder$.subscribe((value) => {
      this.folder = value;
      this.getImages(this.folder);
    });
  }

  ngOnDestroy() {
    this.folderSubscription.unsubscribe();
  }
}
