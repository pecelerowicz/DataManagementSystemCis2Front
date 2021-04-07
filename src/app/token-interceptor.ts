import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { environmentCustom } from '../environments/environment.custom';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(req.url);
    if (
      req.url !== environmentCustom.address + "/api/auth/signup" &&
      req.url !== environmentCustom.address + "/api/auth/login"
    ) {
      console.log(req.url)
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getJwtToken()}`,
        },
      });
    }
    return next.handle(req);
  }
}
