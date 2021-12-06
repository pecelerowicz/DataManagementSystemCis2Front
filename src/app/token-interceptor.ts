import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { environmentCustom } from '../environments/environment.custom';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {

  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(public authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
      Observable<HttpEvent<any>> {

      console.log("url = " + req.url);  
      console.log("index of refresh = " + req.url.indexOf('refresh'))
      console.log("index of login = " + req.url.indexOf('login'))  

      // we let all 'auth' requests in, so do not add token (?)
      //if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
      if (req.url.indexOf('auth') !== -1) {
        console.log("refresh/login")    
        return next.handle(req);
      }
      
      const jwtToken = this.authService.getJwtToken();
      
      if (jwtToken) {
          return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
            console.log("---error---")  
            console.log(error)
            console.log("---error---`")
            if (error instanceof HttpErrorResponse
                  && (error.status === 403 || (error.status === 500 && error.error.exception === "io.jsonwebtoken.ExpiredJwtException"))) {
                  console.log("<<<>>>")
                  console.log(error.status)
                  console.log(error.error.exception)
                  console.log("<<<>>>")
                  return this.handleAuthErrors(req, next);
              } else {
                  return throwError(error);
              }
          }));
      }
      return next.handle(req);

  }

  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> { 
    console.log(this.isTokenRefreshing);
    if (!this.isTokenRefreshing) {
          this.isTokenRefreshing = true;
          this.refreshTokenSubject.next(null);

          console.log("bbb");

          return this.authService.refreshToken().pipe(
              switchMap((refreshTokenResponse: LoginResponse) => {
                  this.isTokenRefreshing = false;
                  this.refreshTokenSubject
                      .next(refreshTokenResponse.authenticationToken);
                  return next.handle(this.addToken(req,
                      refreshTokenResponse.authenticationToken));
              })
          )
      } else {

          console.log("ccc");

          return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap((res) => {
                  return next.handle(this.addToken(req,
                      this.authService.getJwtToken()))
              })
          );
      }
  }

  addToken(req: HttpRequest<any>, jwtToken: any) {
      return req.clone({
          headers: req.headers.set('Authorization',
              'Bearer ' + jwtToken)
      });
  }

  // isTokenRefreshing = false;
  // refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  
  // constructor(public authService: AuthService) {}

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
  //   if (
  //     req.url !== environmentCustom.address + "/api/auth/signup" &&
  //     req.url !== environmentCustom.address + "/api/auth/login"
  //   ) {
     
  //     req = req.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${this.authService.getJwtToken()}`,
  //       },
  //     });
  //   }
  //   return <any> next.handle(req).pipe(catchError(error => {
  //     if(error instanceof HttpErrorResponse && error.status === 403) {
  //       console.log("tutaj");
  //       return this.handleAuthErrors(req, next);
  //     } else {
  //       return throwError(error);
  //     }
  //   }))
  // }
}


interface LoginResponse {
  authenticationToken: string;
  refreshToken: string;
  expiresAt: Date;
  username: string;
}