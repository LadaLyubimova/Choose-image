import {Component, Input, OnInit} from '@angular/core';
import {Ifolder} from "../../../../structure";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-folder-item',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './folder-item.component.html',
  styleUrl: './folder-item.component.less'
})
export class FolderItemComponent implements OnInit{
    @Input() folder!:Ifolder;
    hasSubfolders:boolean = false;
    ngOnInit() {
      if (this.folder.items){
        for (let item of this.folder.items) {
          if (item.type === 'folder'){
            this.hasSubfolders = true;
          }
        }
      }
    }
}
