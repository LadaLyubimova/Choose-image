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

  getImages(folder: Ifolder) {
    let images: any[] = [];
    for (let item of folder.items) {
      if (item.type === 'image') {
        images.push(item);
      }
      else if (item.type === 'folder') {
        const itemFolder = item as Ifolder;
        for (let subItem  of itemFolder.items) {
          if (subItem.type === 'image'){
            images.push(subItem);
          }
        }
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
