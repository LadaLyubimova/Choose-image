import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewChecked,
  HostListener
} from '@angular/core';
import {Iimage} from "../../../../structure";
import {SelectedImageDirective} from "../selected-image.directive";
import {ImagesService} from "../../../images.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-image-item',
  standalone: true,
  imports: [
    SelectedImageDirective,
    NgIf
  ],
  templateUrl: './image-item.component.html',
  styleUrl: './image-item.component.less'
})
export class ImageItemComponent{
  @Input() images!:Iimage;
  @ViewChild('imageButton') imageButton!: ElementRef;
  imageSelect: boolean = false;

  imageWasSelect(image:Iimage, event: Event) {
    this.ImagesService.imageSelected(image);
    this.imageSelect = true;
    this.ImagesService.setImageSelect(this.imageSelect);
  }


  constructor(private ImagesService:ImagesService) {
  }
}
