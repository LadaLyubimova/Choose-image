import { Component, Input } from '@angular/core';
import {Iimage} from "../../../../structure";

@Component({
  selector: 'app-image-item',
  standalone: true,
  imports: [],
  templateUrl: './image-item.component.html',
  styleUrl: './image-item.component.less'
})
export class ImageItemComponent {
  @Input() images!:Iimage;

}
