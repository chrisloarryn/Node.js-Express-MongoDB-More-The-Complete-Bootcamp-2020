import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {
    console.log(this.authService.getTokenJwt())
  }

  intercept(req, next) {

    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getTokenJwt()}`
      }
    })

    return next.handle(tokenizeReq);
  }


}
