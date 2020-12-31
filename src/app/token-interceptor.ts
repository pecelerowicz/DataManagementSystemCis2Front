import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

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
      req.url !== 'http://localhost:8080/api/auth/signup' &&
      req.url != 'http://localhost:8080/api/auth/login'
    ) {
      console.log('tutaj');
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getJwtToken()}`,
        },
      });
    }
    return next.handle(req);
  }
}
