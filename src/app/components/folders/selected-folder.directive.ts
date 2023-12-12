import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appSelectedFolder]',
  standalone: true
})
export class SelectedFolderDirective {
  @HostBinding('class.select') isSelect = false;

  @HostListener('click') toggledOpen() {
    this.isSelect = true;
  }

  @HostListener('document:click', ['$event']) toggleOpen(event:Event) {
    this.isSelect = this.elRef.nativeElement.contains(event.target) ? this.isSelect: false;
  }
  constructor(private elRef: ElementRef) { }

}
