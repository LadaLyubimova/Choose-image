import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {WhiteBoxComponent} from "./components/white-box/white-box.component";
import {FoldersService} from "./folders.service";
import {Token} from "./shared/token.modele"
import {filter,Subscription,} from "rxjs";
import {HttpBackend, HttpClient, HttpClientModule, HttpHeaders, HttpParams} from "@angular/common/http";
import {TokenService} from "./shared/token.service";
import {GetImagePipe} from "./shared/get-image.pipe";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, WhiteBoxComponent, HttpClientModule, GetImagePipe],
  providers: [GetImagePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Choose-image';
  path!: string;
  tokenLoad: boolean = false;
  sub!: Subscription;
  url:any;

  constructor(private folderService: FoldersService, private activeRoute: ActivatedRoute, private tokenService: TokenService, private handler: HttpBackend) {
  }

  ngOnInit() {
    const params = new HttpParams()
      .set('client_id', '3c210cd9-457d-4dd6-923a-4711d8380638')
      .set('client_secret', 'xN0PliyWYuxps3FTboDNITVsoehQtBUnFOiOYO9aMG01lutBADyiwpoiLU9G7zuj')
      .set('grant_type', 'client_credentials');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });


    const httpClientWithoutInt = new HttpClient(this.handler);
    httpClientWithoutInt.post('https://backoffice-devenv.azurewebsites.net/connect/token', params, {headers}).subscribe(
        (token) => {
          // console.log("Token send");
          this.tokenService.setToken((token as unknown as Token).access_token);
          this.tokenLoad = true;
          this.sub = this.activeRoute.queryParams.pipe(filter(queryParams => queryParams['path'] !== ''))
              .subscribe((queryParams) => {
                    this.path = queryParams['path'];
                    this.folderService.getFolders(this.path, "APP_COMPONENT").subscribe(value => {
                          // console.log(value);
                          // this.folderService.entities = value.entities;
                        }
                    );
                  }
              )
        }
    );
  }

  ngOnDestroy() {
    if (this.sub){
      this.sub.unsubscribe();
    }
  }

}
