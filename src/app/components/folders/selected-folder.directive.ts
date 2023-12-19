import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';
import {FoldersService} from "../../folders.service";

@Directive({
  selector: '[appSelectedFolder]',
  standalone: true
})
export class SelectedFolderDirective {
  @HostBinding('class.select') isSelect = false;

  // @HostListener('click') toggledOpen() {
  //   this.isSelect = true;
  // }
  //
  // @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
  //   if (this.elRef.nativeElement.contains(event.target)) {
  //     if (this.elRef.nativeElement.classList.contains('folder')) {
  //       console.log('Есть класс folder и целевой элемент');
  //       console.log(this.elRef);
  //       console.log(event.target);
  //       this.isSelect = true;
  //     }
  //   } else {
  //     if (this.elRef.nativeElement.classList.contains('folder')) {
  //       console.log('Есть класс folder но не целевой элемент');
  //       console.log(this.elRef);
  //       console.log(event.target);
  //       this.isSelect = false;
  //     }
  //   }
  // }
  constructor(private elRef: ElementRef, private foldService:FoldersService) { }

}
