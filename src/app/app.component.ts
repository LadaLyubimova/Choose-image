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
  constructor() {
  }

}
