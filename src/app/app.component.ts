import {Component, HostListener, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {WhiteBoxComponent} from "./components/white-box/white-box.component";
import {ImagesService} from "./images.service";
import {FoldersService} from "./folders.service";
import {Ifolder} from "../structure";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, WhiteBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit{
  title = 'Choose-image';

  folderJSON!:Ifolder;
  eventJSON!:Event;
  crumbLevel!:number;
  constructor(private folderService:FoldersService, private router:Router, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    // if (typeof window !== 'undefined'){
    //   this.getDataFromLocalStorage();
    //   this.folderService.folderSelected(this.folderJSON, this.eventJSON, this.crumbLevel);
    //   this.folderService.selectCrumb(this.folderJSON,this.eventJSON,this.crumbLevel)
    // }
    this.activeRoute.queryParams.subscribe(
      queryParams => {
        this.folderJSON = this.folderService.getFolderById(queryParams['folder']);
        this.eventJSON = queryParams['event'];
        this.crumbLevel = queryParams['level'];
        this.folderService.folderSelected(this.folderJSON, this.eventJSON, this.crumbLevel);
        this.folderService.selectCrumb(this.folderJSON,this.eventJSON,this.crumbLevel);
      }
    )
  }

  getDataFromUrl() {

}

  // getDataFromLocalStorage() {
  //
  //   let folder = localStorage.getItem('selectFolder');
  //   let event = localStorage.getItem('selectEvent');
  //   let level = localStorage.getItem('crumbLevel');
  //
  //   if (typeof (folder) === "string" && typeof (event) === "string" && typeof (level) === "string") {
  //     this.folderJSON = JSON.parse(folder);
  //     this.eventJSON = JSON.parse(event);
  //     this.crumbLevel = JSON.parse(level) as number;
  //   }
  // }


}
