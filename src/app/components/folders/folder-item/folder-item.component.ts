import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ifolder, Iimage} from "../../../../structure";
import {NgForOf, NgIf} from "@angular/common";
import {SelectedFolderDirective} from "../selected-folder.directive";
import {SelectedSvgRotateDirective} from "../selected-svg-rotate.directive";
import {FoldersService} from "../../../folders.service";
import {ActivatedRoute, Params, Router} from "@angular/router";


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


  constructor(private folderService: FoldersService, private router:Router, private activateRoute:ActivatedRoute) {
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
    let subfolders = this.folderService.getSubFolders(folder);
    subfolders.forEach((fold) => {
      this.imageCounter(fold,this.countImage)
      }
    )

    return this.countImage;
  }

  subfolderCheck(folder:Ifolder) {
    if (this.folderService.getSubFolders(folder).length >= 1){
      return true;
    }
    else {
      return false;
    }
  }

  writeSubFoldersInArray(folder: Ifolder) {
    let arr: Ifolder[] = [];
    let subfolders = this.folderService.getSubFolders(folder);
    subfolders.forEach((fold)=>{
      arr.push(fold);
    })

    // for (let index of folder.subFolders) {
    //   arr.push(this.folderService.getFolderById(index));
    // }
    return arr;
  }


  onSelected(folder: Ifolder, event: Event) {
    console.log(event);
    if ((event.target as HTMLElement).tagName === 'BUTTON' || (event.target as HTMLElement).tagName === 'P' || (event.target as HTMLElement).id === "icon-folder")
     {
       this.folderService.redirectionToFolderPath(folder);
       this.folderService.folderSelected(folder, event);

    }
    if (folder.type === 'folder') {
      if (this.subFoldersOpen) {
        this.items = this.writeSubFoldersInArray(folder);
        this.folderService.redirectionToFolderPath(folder);
      }
    } else {
      console.log("Error: type not " + typeof (this.folder) + ' type is ' + folder.type)
    }

  }
}
