import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ifolder, Iimage} from "../../../../structure";
import {NgForOf, NgIf} from "@angular/common";
import {SelectedFolderDirective} from "../selected-folder.directive";
import {SelectedSvgRotateDirective} from "../selected-svg-rotate.directive";


@Component({
  selector: 'app-folder-item',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    SelectedFolderDirective,
    SelectedSvgRotateDirective
  ],
  templateUrl: './folder-item.component.html',
  styleUrl: './folder-item.component.less'
})
export class FolderItemComponent implements OnInit {
  @Input() folder!: Ifolder;
  @Output() folderSelected: EventEmitter<Ifolder> = new EventEmitter<Ifolder>();
  items: Ifolder[] = [];
  subfoldersOpen: boolean = false;

  ngOnInit() {
  }

  subfolderCheck(folderItems: any) {
    if (typeof (folderItems) === "object") {
    }
    for (let item of folderItems) {
      if (item.type === 'folder') {
        // console.log('Имя подпапки ' + item.name + ' Итерация: ' + this.i)
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  writeItemsInArray(folder: Ifolder) {
    let arr: Ifolder[] = [];
    for (let item of folder.items) {
      if (item.type === 'folder') {
        if ("items" in item) {
          arr.push({name: item.name, type: item.type, items: item?.items});
          console.log(arr)
        }
      }
    }
    return arr;
  }


  onSelected(folder: Ifolder) {
    if (folder.type === 'folder') {
      if (this.subfolderCheck(folder.items)) {
        this.subfoldersOpen = !this.subfoldersOpen;
        // alert('Папка открыта? ' + this.subfoldersOpen);
        this.folderSelected.emit(folder);
        this.items = this.writeItemsInArray(folder);
      }
    } else {
      console.log("Error: type not " + typeof (this.folder) + ' type is ' + folder.type)
    }

  }
}
