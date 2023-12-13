import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FolderItemComponent} from "./folder-item/folder-item.component";
import {FoldersService} from "../../folders.service";
import {Ifolder} from "../../../structure";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-folders',
  standalone: true,
  imports: [
    FolderItemComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './folders.component.html',
  styleUrl: './folders.component.less',
})
export class FoldersComponent implements OnInit{
  fold!: Ifolder[];


  ngOnInit(): void {
    this.fold = this.folderService.getFolders();
  }

  constructor(private folderService: FoldersService) {
  }
}
