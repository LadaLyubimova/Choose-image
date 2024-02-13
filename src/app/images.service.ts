import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {entity} from "../structure";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  selectedImage:Subject<entity|undefined> = new Subject();
  selectedImage$ = this.selectedImage.asObservable();
  srcLoadSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  srcLoad$:Observable<boolean> = this.srcLoadSubject.asObservable();

  imageSelected(image:entity){
    this.selectedImage.next(image)
  }

  constructor() { }
}
