import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Input() level:number = 0;
  items: Ifolder[] = [];
  subFoldersOpen: boolean = false;
  private countImage: number = 0;


  constructor(private folderService: FoldersService, private elRef:ElementRef) {
  }

  ngOnInit() {
    this.level++;
  }

  imageCounter(folder: Ifolder, currentCount: number = 0): number {
    this.countImage = currentCount;
    for (let item of folder.items) {
        if (item.type === 'image') {
          this.countImage++;
        }
        else {
          this.imageCounter(item as unknown as Ifolder, this.countImage);
        }
      }
    for (let index of folder.subFolders) {
      this.imageCounter(this.folderService.getFolderById(index), this.countImage)
    }



    // for (let item of folder.items) {
    //   if (item.type === 'image') {
    //     this.countImage++;
    //   } else {
    //     this.imageCounter(item as unknown as Ifolder, this.countImage);
    //   }
    // }

    return this.countImage;
  }

  subfolderCheck(folder:Ifolder) {
    if (folder.subFolders.length >= 1){
      return true;
    }
    else {
      return false;
    }

    // if (typeof (folderItems) === "object") {
    // }
    // for (let item of folderItems) {
    //   if (item.type === 'folder') {
    //     // console.log('Имя подпапки ' + item.name + ' Итерация: ' + this.i)
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
    // return false;
  }

  writeSubFoldersInArray(folder: Ifolder) {
    let arr: Ifolder[] = [];
    for (let index of folder.subFolders) {
      arr.push(this.folderService.getFolderById(index));
    }
    return arr;

    // let arr: Ifolder[] = [];
    // for (let item of folder.items) {
    //   if (item.type === 'folder') {
    //     const folderItem = item as unknown as Ifolder;
    //       arr.push({name: folderItem.name, type: folderItem.type, items: folderItem.items, subFolders: folderItem.subFolders, id: folderItem.id});
    //   }
    // }
    // return arr;
  }


  onSelected(folder: Ifolder, event: Event) {
    this.folderService.folderBreadcrumbs(this.level,0,[],folder);
    //Adding deleting classes

    //Opening and closing subfolders and select folder

    if (folder.type === 'folder') {
      if (this.subFoldersOpen) {
        this.items = this.writeSubFoldersInArray(folder);
        // alert('Папка открыта? ' + this.subFoldersOpen);
      }
      if ((event.target as HTMLElement).tagName === 'BUTTON') {
        this.folderService.folderSelected(folder, event);
      }
    } else {
      console.log("Error: type not " + typeof (this.folder) + ' type is ' + folder.type)
    }

  }

  itemsCheck(folder: Ifolder){
    return folder.items !== undefined;

  }
}
