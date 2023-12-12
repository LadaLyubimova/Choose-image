import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appSelectedSvgRotate]',
  standalone: true
})
export class SelectedSvgRotateDirective {

  @HostBinding('class.rotate') isRotate = false;

  @HostListener('click') toggledOpen() {
    this.isRotate = !this.isRotate;
  }


  constructor() { }
}
