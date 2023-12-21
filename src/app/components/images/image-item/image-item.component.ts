import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewChecked,
  HostListener, OnDestroy, OnInit
} from '@angular/core';
import {Iimage} from "../../../../structure";
import {SelectedImageDirective} from "../selected-image.directive";
import {ImagesService} from "../../../images.service";
import {NgClass, NgIf} from "@angular/common";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-image-item',
  standalone: true,
  imports: [
    SelectedImageDirective,
    NgIf,
    NgClass
  ],
  templateUrl: './image-item.component.html',
  styleUrl: './image-item.component.less'
})
export class ImageItemComponent implements OnInit {
  @Input() image!: Iimage;
  imageSelect: boolean = false;
  currentImage!: Iimage;
  imageSelectSubscription!: Subscription;
  currentImageSubscription!: Subscription;
  currentSelected!: boolean;

  ngOnInit() {


  }

  imageWasSelect(image: Iimage, event: Event) {
    this.ImagesService.imageSelected(image);

  }

  isSelected() {
    if (this.currentImage === this.image && this.currentSelected) {
      // console.log(this.currentImage === this.image);
      // console.log(this.image);
      // console.log(this.currentImage);
      return true;
    } else {
      return false;
    }
  }

  constructor(private ImagesService: ImagesService) {
    this.imageSelectSubscription = this.ImagesService.selectedImage$.subscribe((value) => {
      this.currentSelected = value;
      this.imageSelect = this.isSelected();
    });


    this.currentImageSubscription = this.ImagesService.selectedItem$.subscribe((value) => {
      this.currentImage = value;
      this.imageSelect = this.isSelected();
    });
  }
}
