import { Pipe, PipeTransform } from '@angular/core';
import {entity} from "../../structure";
import {Subscription} from "rxjs";

@Pipe({
  name: 'previewUrl',
  standalone: true
})
export class PreviewUrlPipe implements PipeTransform {

  transform(imageDto:entity): {url:string,type:string} {
    let request:{url:string,type:string} = {url:'', type:''};
    if (imageDto.previews["backoffice-preview"] !== undefined){
      request= {url:imageDto.previews["backoffice-preview"].url, type:'src'};
    }
    else {
      request = {url:'https://apigateway-devenv.azurewebsites.net/api/processor/v1/images/' +imageDto.id + '/preview/test-application' + '/%22' + imageDto.name + '%22/' + 145 + 'x' + 145 + '/url', type:'http'};
    }
    return request;
  }
}
