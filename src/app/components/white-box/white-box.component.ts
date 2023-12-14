import {Component, Input} from '@angular/core';
import {FoldersComponent} from "../folders/folders.component";
import {ImagesComponent} from "../images/images.component";
import {Ifolder, Iimage} from "../../../structure";
import {ImagesService} from "../../images.service";
import {Subscription} from "rxjs";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-white-box',
  standalone: true,
  imports: [
    FoldersComponent,
    ImagesComponent,
    NgClass
  ],
  templateUrl: './white-box.component.html',
  styleUrl: './white-box.component.less'
})
export class WhiteBoxComponent {
  @Input() selectedFolder!: Ifolder;
  private imageSubscription!: Subscription;
  private imageSelectSubscription!: Subscription;
  image!:Iimage;
  imageSelect!:boolean;

  constructor(private ImagesService: ImagesService) {
    this.imageSubscription = this.ImagesService.selectedItem$.subscribe((value) => {
      this.image = value;
    });
    this.imageSelectSubscription = this.ImagesService.selectedImage$.subscribe((value) => {
      this.imageSelect = value;
    });
  }
}
