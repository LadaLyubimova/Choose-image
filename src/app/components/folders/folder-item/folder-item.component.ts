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
    for (let index of folder.subFolders) {
      this.imageCounter(this.folderService.getFolderById(index), this.countImage)
    }

    return this.countImage;
  }

  subfolderCheck(folder:Ifolder) {
    if (folder.subFolders.length >= 1){
      return true;
    }
    else {
      return false;
    }
  }

  writeSubFoldersInArray(folder: Ifolder) {
    let arr: Ifolder[] = [];
    for (let index of folder.subFolders) {
      arr.push(this.folderService.getFolderById(index));
    }
    return arr;
  }


  onSelected(folder: Ifolder, event: Event) {
    const queryParams:Params = {folder: folder.id, level: this.level, event:event as Event};
    this.router.navigate([],{relativeTo: this.activateRoute, queryParams, queryParamsHandling:"merge"});
    // this.folderService.folderBreadcrumbs(this.level,0,[],folder);
    //Adding deleting classes

    //Opening and closing subfolders and select folder

    if (folder.type === 'folder') {
      if (this.subFoldersOpen) {
        this.items = this.writeSubFoldersInArray(folder);
        // alert('Папка открыта? ' + this.subFoldersOpen);
      }
      if ((event.target as HTMLElement).tagName === 'BUTTON') {
        this.folderService.folderSelected(folder, event, this.level);
      }
    } else {
      console.log("Error: type not " + typeof (this.folder) + ' type is ' + folder.type)
    }

  }

  itemsCheck(folder: Ifolder){
    return folder.items !== undefined;

  }
}
