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
  items: Ifolder[] = [];
  subfoldersOpen: boolean = false;
  private countImage: number = 0;


  ngOnInit() {
  }

  imageCounter(folder: Ifolder, currentCount: number = 0): number {
    this.countImage = currentCount;

    for (let item of folder.items) {
      if (item.type === 'image') {
        this.countImage++;
      } else {
        this.imageCounter(item as Ifolder, this.countImage);
      }
    }

    return this.countImage;
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


  onSelected(folder: Ifolder,event: Event) {
    if (this.folderService.clickedElement){
      // console.log('Существует');
      this.folderService.clickedElement.classList.remove('select');
    }
    this.folderService.clickedElement = event.target as HTMLElement;
    this.folderService.clickedElement.classList.add('select');
    // console.log(folder);
    if (folder.type === 'folder') {
      if (folder.items) {
        if (this.subfolderCheck(folder.items)) {
          this.subfoldersOpen = !this.subfoldersOpen;
          // alert('Папка открыта? ' + this.subfoldersOpen);
          this.items = this.writeItemsInArray(folder);
        }
      }
    } else {
      console.log("Error: type not " + typeof (this.folder) + ' type is ' + folder.type)
    }
    this.folderService.folderSelected(folder);
  }

  itemsCheck(folder: Ifolder){
    return folder.items !== undefined;

  }

  constructor(private folderService: FoldersService, private elRef:ElementRef) {
  }
}
