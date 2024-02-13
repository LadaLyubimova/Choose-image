import {Component, Input, OnInit} from '@angular/core';
import {folder} from "../../../../structure";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {SelectedFolderDirective} from "../selected-folder.directive";
import {SelectedSvgRotateDirective} from "../selected-svg-rotate.directive";
import {FoldersService} from "../../../folders.service";
import {map, Observable, take} from "rxjs";


@Component({
  selector: 'app-folder-item',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    SelectedFolderDirective,
    SelectedSvgRotateDirective,
    AsyncPipe,
    NgClass
  ],
  templateUrl: './folder-item.component.html',
  styleUrl: './folder-item.component.less'
})
export class FolderItemComponent implements OnInit {
  @Input() folder!: folder;
  @Input() level: number = 0;
  items!: Observable<folder[]>;
  subFoldersOpen: boolean = false;
  countImages: Observable<number> = new Observable<number>();
  folderSelect: boolean = false;


  constructor(private folderService: FoldersService) {
    this.folderService.selectedFolder$.subscribe(
        value => {
          this.folderSelect = value.id === this.folder.id;
          if (value.id === this.folder.id) {
            this.folderService.redirectionToFolderPath(this.folder);
            this.folderService.pushBreadcrumbsInArray(this.folder);
          }
        }
    )
  }

  ngOnInit() {
    this.level++;
    this.imageCounter(this.folder);
    this.items = this.folderService.getSubFolders(this.folder.path + this.folder.name + '/');
    this.items.subscribe(value => {
      this.folderService.foldersNew.push(...value);
    });
  }

  onSelected() {
      this.folderService.selectedFolderSubject.next(this.folder);
  }

  imageCounter(folder: folder) {
    this.countImages = this.folderService.getFolders(folder.path + folder.name + '/').pipe(
      take(1),
      map(
        (obj) =>
          obj.entitiesCount
      ));
    return this.countImages;
  }
}
