import {ElementRef, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Iimage} from "../structure";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private selectedItemSubject = new BehaviorSubject<Iimage>({name: '',type: '', url: ''});
  selectedItem$ = this.selectedItemSubject.asObservable();
  private selectedImageSubject = new BehaviorSubject<boolean>(false);
  selectedImage$ = this.selectedImageSubject.asObservable();

  imageSelected(image:Iimage){
    this.selectedItemSubject.next(image);
  }

  setImageSelect(bool:boolean) {
    this.selectedImageSubject.next(bool);
  }

  constructor() { }
}
