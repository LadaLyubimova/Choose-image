import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';
import {ImagesService} from "../../images.service";

@Directive({
  selector: '[appSelectedImage]',
  standalone: true
})
export class SelectedImageDirective {
  @HostBinding('class.select-image') isSelect = false;


  @HostListener('document:click', ['$event']) toggleOpen(event:Event) {
    this.isSelect = this.elRef.nativeElement.contains(event.target);
  };

  constructor(private elRef: ElementRef, private ImagesService:ImagesService) { }

}
