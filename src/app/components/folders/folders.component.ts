import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FolderItemComponent} from "./folder-item/folder-item.component";
import {FoldersService} from "../../folders.service";
import {Ifolder} from "../../../structure";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-folders',
  standalone: true,
  imports: [
    FolderItemComponent,
    NgForOf
  ],
  templateUrl: './folders.component.html',
  styleUrl: './folders.component.less',
  providers: [FoldersService]
})
export class FoldersComponent implements OnInit{
  @Output() folderWasSelected = new EventEmitter<Ifolder>();
  fold!: Ifolder[];

  onFolderSelected(folder:Ifolder) {
    this.folderWasSelected.emit(folder)
  }
  ngOnInit(): void {
    this.fold = this.folderService.getFolders();
  }

  constructor(private folderService: FoldersService) {
  }
}
