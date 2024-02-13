import {Component, OnInit, OnDestroy} from '@angular/core';
import {FolderItemComponent} from "./folder-item/folder-item.component";
import {FoldersService} from "../../folders.service";
import {folder} from "../../../structure";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {map, Observable, Subscription, tap} from "rxjs";

@Component({
  selector: 'app-folders',
  standalone: true,
  imports: [
    FolderItemComponent,
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './folders.component.html',
  styleUrl: './folders.component.less',
})
export class FoldersComponent implements OnInit, OnDestroy {
  folders!: Observable<folder[]>;
  sub!: Subscription;

  constructor(private folderService: FoldersService) {
  }

  ngOnInit(): void {
    this.folders = this.folderService.getFolders('/', 'APP_FOLDERS').pipe(
      map(
        (obj) =>
          obj.folders
      ));

  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
