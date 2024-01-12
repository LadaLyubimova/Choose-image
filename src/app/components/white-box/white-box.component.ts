import {Component, Input, OnDestroy} from '@angular/core';
import {FoldersComponent} from "../folders/folders.component";
import {ImagesComponent} from "../images/images.component";
import {Ifolder, Iimage} from "../../../structure";
import {ImagesService} from "../../images.service";
import {map, Subscription} from "rxjs";
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
  private imageSubscription!: Subscription;
  private imageSelectSubscription!: Subscription;
  private breadcrumbsSelectSubscription!: Subscription;
  image!:Iimage;
  imageSelect!:boolean;
  breadcrumbsArr!:Ifolder[];

  constructor(private ImagesService: ImagesService, public FolderService:FoldersService) {
    this.imageSubscription = this.ImagesService.selectedItem$.subscribe((value) => {
      this.image = value;
    });
    this.imageSelectSubscription = this.ImagesService.selectedImage$.subscribe((value) => {
      this.imageSelect = value;
    });
    this.breadcrumbsSelectSubscription = this.FolderService.breadcrumbsArr$.subscribe((value) => {
      this.breadcrumbsArr = value;
    });
  }

  ngOnDestroy() {
    this.imageSubscription.unsubscribe();
    this.imageSelectSubscription.unsubscribe();
    this.breadcrumbsSelectSubscription.unsubscribe();
  }

  onSelectCrumb(folder:Ifolder, event: Event, level:number){
    this.FolderService.selectCrumb(folder,event,level);
  }

  onInsert() {
    if (this.imageSelect) {
      alert('Image: ' + this.image.name);
    }
    else {
      alert('Image not selected')
    }
  }
}
