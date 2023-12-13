import {Component, Input} from '@angular/core';
import {FoldersComponent} from "../folders/folders.component";
import {ImagesComponent} from "../images/images.component";
import {Ifolder} from "../../../structure";

@Component({
  selector: 'app-white-box',
  standalone: true,
  imports: [
    FoldersComponent,
    ImagesComponent
  ],
  templateUrl: './white-box.component.html',
  styleUrl: './white-box.component.less'
})
export class WhiteBoxComponent {
  @Input() selectedFolder!: Ifolder;
}
