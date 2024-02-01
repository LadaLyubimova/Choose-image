import {Injectable} from "@angular/core";
import {HttpClient, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {TokenService} from "./token.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authToken: string = '';
    if (req.url === 'https://backoffice-devenv.azurewebsites.net/connect/token') {
      console.log("A token request has been sent");
      return next.handle(req.clone());
    } else {
      authToken = this.auth.getToken();
      const authReq = req.clone({
        headers: req.headers.set('Authorization', authToken)
      });
      console.log(authReq.headers);
      return next.handle(authReq);
    }
  }
}
