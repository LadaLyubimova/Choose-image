import {Injectable} from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {TokenService} from "./token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  authToken: string = '';
  constructor(private auth: TokenService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url === 'https://backoffice-devenv.azurewebsites.net/connect/token') {
      console.log("A token request has been sent");
      return next.handle(req.clone());
    } else {
      this.authToken = this.auth.getToken();
      const authReq = req.clone({
        headers: req.headers.set("Authorization",('Bearer ' + this.authToken) as string)
      });
      return next.handle(authReq);
    }
  }
}
