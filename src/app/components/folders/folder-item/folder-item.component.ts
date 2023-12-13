import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ifolder, Iimage} from "../../../../structure";
import {NgForOf, NgIf} from "@angular/common";
import {SelectedFolderDirective} from "../selected-folder.directive";
import {SelectedSvgRotateDirective} from "../selected-svg-rotate.directive";
import {FoldersService} from "../../../folders.service";


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
  items: Ifolder[] = [];
  subfoldersOpen: boolean = false;

  ngOnInit() {
  }

  imageCounter (folder:Ifolder) {
    let countImage:number = 0;
    for (let item of folder.items) {
      if (item.type === 'image'){
        countImage++;
      }
      else if((item as Ifolder).items)
      {
        const itemFolder = item as Ifolder;
        for (let subItem  of itemFolder.items) {
          if (subItem.type === 'image'){
            countImage++;
          }
        }
      }
    }
  return countImage;
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
        this.items = this.writeItemsInArray(folder);
      }
    } else {
      console.log("Error: type not " + typeof (this.folder) + ' type is ' + folder.type)
    }
    this.folderService.folderSelected(folder);
  }

  constructor(private folderService: FoldersService) {
  }
}
