import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {entity} from "../../../../structure";
import {SelectedImageDirective} from "../selected-image.directive";
import {ImagesService} from "../../../images.service";
import {AsyncPipe, NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PreviewUrlPipe} from "../../../shared/preview-url.pipe";
import {GetImagePipe} from "../../../shared/get-image.pipe";

@Component({
    selector: 'app-image-item',
    standalone: true,
    imports: [
        SelectedImageDirective,
        NgIf,
        NgClass,
        AsyncPipe,
        NgOptimizedImage,
        PreviewUrlPipe,
        GetImagePipe
    ],
    templateUrl: './image-item.component.html',
    styleUrl: './image-item.component.less'
})
export class ImageItemComponent implements OnInit, OnDestroy {
    @Input() image!: entity;
    imageSelect: boolean = false;
    imageSelectSubscription!: Subscription;
    sub!: Subscription;
    src!: boolean;
    isLoading: boolean = true;

    constructor(private imagesService: ImagesService, private http: HttpClient) {
    }

    ngOnInit() {
        this.imagesService.srcLoad$.subscribe(value => {
            this.src = value;
        });
        this.imageSelectSubscription = this.imagesService.selectedImage$
            .subscribe((value) => {
                if (value) {
                    this.imageSelect = value.id === this.image.id;
                } else if (value === undefined) {
                    this.imageSelect = false;
                }
            });
    }

    hideLoader() {
        this.isLoading = false;
    }

    imageWasSelect(image: entity, event: Event) {
        this.imagesService.imageSelected(image);
    }


    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
