import {Component, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {WhiteBoxComponent} from "./components/white-box/white-box.component";
import {ImagesService} from "./images.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, WhiteBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'Choose-image';

  @HostListener('document:click', ['$event']) click(event:Event) {
    const targetElement = event.target as HTMLElement;
    if (targetElement.classList.contains('image')) {
      // console.log('Это картинка!');
      this.imgService.setImageSelect(true);
    }
    else {
      this.imgService.setImageSelect(false);
      // console.log('Это не картинка!');
    }

  };

  constructor(private imgService:ImagesService) {
  }

}
