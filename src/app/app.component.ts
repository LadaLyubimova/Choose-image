import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Params, Router, RouterOutlet} from '@angular/router';
import {WhiteBoxComponent} from "./components/white-box/white-box.component";
import {FoldersService} from "./folders.service";
import {Ifolder} from "../structure";
import {filter, of, Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, WhiteBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Choose-image';
  path!: string;
  sub!:Subscription;
  constructor(private folderService:FoldersService, private router:Router, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
      this.sub = this.activeRoute.queryParams.pipe(filter(queryParams => queryParams['path'] !== ''))
        .subscribe((queryParams) =>
          {
            this.path = queryParams['path'];
            this.folderService.getFolderByPath(queryParams['path']);
            let folderFromPath = this.folderService.getFolderByPath(queryParams['path']);
            this.folderService.folderSelected(folderFromPath, new Event('queryParams'));
            this.folderService.setClasses();
          }
      )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
