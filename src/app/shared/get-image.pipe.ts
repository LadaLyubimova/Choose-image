import {Pipe, PipeTransform} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ImagesService} from "../images.service";

@Pipe({
  name: 'getImage',
  standalone: true
})
export class GetImagePipe implements PipeTransform {
  constructor(private http: HttpClient, private imageService: ImagesService) {
  }

  transform(req: { url: string, type: string }): Observable<Object | String> | undefined {
    if (req.type === "http") {
      this.imageService.srcLoadSubject.next(false);
      return this.http.get(req.url, {headers: {"accept": "application/json"}});
    } else {
      this.imageService.srcLoadSubject.next(false);
      return new Observable<String>((src) => {
        src.next(req.url);
      });
    }
  }
}
