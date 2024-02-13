import {Component, HostListener, OnDestroy} from '@angular/core';
import {FoldersService} from "../../folders.service";
import {entity, folder} from "../../../structure";
import {Subscription} from 'rxjs';
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
  folder: folder = {
    customFields: {},
    hasChildren: false,
    id: '1',
    lastModified: '',
    name: 'Folder',
    ownerId: '1',
    path: '/',
    private: false,
  };
  private subscription!: Subscription;
  images: entity[] = []

  constructor(public folderService: FoldersService, private imgService: ImagesService) {
    this.subscription = this.folderService.entities$.subscribe(value => {
      this.images = value;
    });
  }

  @HostListener('click', ['$event']) click(event: Event) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.classList.contains('image')) {
      this.imgService.selectedImage.next(undefined);
    }
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
