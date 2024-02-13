import {Component, Input, OnDestroy} from '@angular/core';
import {FoldersComponent} from "../folders/folders.component";
import {ImagesComponent} from "../images/images.component";
import {entity, folder, Ifolder} from "../../../structure";
import {ImagesService} from "../../images.service";
import {Subscription} from "rxjs";
import {NgClass, NgForOf} from "@angular/common";
import {FoldersService} from "../../folders.service";

@Component({
  selector: 'app-white-box',
  standalone: true,
  imports: [
    FoldersComponent,
    ImagesComponent,
    NgClass,
    NgForOf
  ],
  templateUrl: './white-box.component.html',
  styleUrl: './white-box.component.less'
})
export class WhiteBoxComponent implements OnDestroy{
  @Input() selectedFolder!: Ifolder;
  private sub!:Subscription;
  image!:entity|undefined;
  imageSelect!:boolean;
  breadcrumbsArr!:folder[];

  constructor(private imagesService: ImagesService, public folderService:FoldersService) {
    this.sub = this.imagesService.selectedImage$.subscribe((value) => {
        this.image = value;
        this.imageSelect = this.image !== undefined;
    });
    this.sub = this.folderService.breadcrumbsArr$.subscribe((value) => {
      this.breadcrumbsArr = value;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSelectCrumb(folder:folder){
    this.folderService.selectCrumb(folder);
  }

  onInsert() {
    if (this.image !== undefined) {
      alert('Image: ' + this.image.name);
    }
    else {
      alert('Image not selected')
    }
  }
}
