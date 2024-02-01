import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Params, Router, RouterOutlet} from '@angular/router';
import {WhiteBoxComponent} from "./components/white-box/white-box.component";
import {FoldersService} from "./folders.service";
import {Token} from "./shared/token.modele"
import {filter, Observable, of, Subscription} from "rxjs";
import {HttpBackend, HttpClient, HttpClientModule, HttpHeaders, HttpParams} from "@angular/common/http";
import {TokenService} from "./shared/token.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, WhiteBoxComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Choose-image';
  path!: string;
  sub!:Subscription;
  constructor(private folderService:FoldersService, private activeRoute: ActivatedRoute, private http:HttpClient, private tokenService:TokenService, private handler: HttpBackend) {
  }

  ngOnInit() {
      const params = new HttpParams()
        .set('client_id', '3c210cd9-457d-4dd6-923a-4711d8380638')
        .set('client_secret', 'xN0PliyWYuxps3FTboDNITVsoehQtBUnFOiOYO9aMG01lutBADyiwpoiLU9G7zuj')
        .set('grant_type', 'client_credentials');
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      const httpClientWithoutInt = new HttpClient(this.handler);
      httpClientWithoutInt.post('https://backoffice-devenv.azurewebsites.net/connect/token', params, { headers }).subscribe(
        (token) => {
          this.tokenService.setToken((token as unknown as Token).access_token);
          this.tokenService.getToken();
        }
      );


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

  test() {
    this.http.post('https://api.apollo.io/v1/people/match', {
      "api_key": "{{apolloAPIKey}}",
      "name": "{{apolloName}}",
      "email": "{{apolloEmail}}"
    }, {headers : {
        "Cache-Control":"no-cache",
    "Content-Type":"application/json"
      }}).subscribe((req)=>{
      console.log(req)
      }
    );
  }
}
