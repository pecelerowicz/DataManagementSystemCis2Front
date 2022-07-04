import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequest } from '../dto/my_auth';
import { LoginResponse } from '../dto/my_auth';
import { environmentCustom } from 'src/environments/environment.custom';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';
import { ChangePasswordRequest, ChangePasswordResponse } from '../dto/my_auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private _snackBar: MatSnackBar
  ) {}

  // signup(registerRequest: RegisterRequest): Observable<any> {
  //   //any?
  //   return this.httpClient.post(
  //     environmentCustom.address + "/api/auth/signup",
  //     registerRequest,
  //     { responseType: 'text' }
  //   );
  // }

  // login
  private _loginSource = new Subject<boolean>();
  login$ = this._loginSource.asObservable();
  login(loginRequest: LoginRequest): void {
    this.httpClient
      .post<LoginResponse>(environmentCustom.address + "/api/auth/login", loginRequest)
      .subscribe(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        this._loginSource.next(true);
        this._snackBar.open('Login successful', '', {duration: 6000});
      },
      (err) => {
        this._snackBar.open('Login failed. Please try again.', '', {duration: 6000});
      })
  }

  // logout
  private _logoutSource = new Subject<boolean>();
  logout$ = this._logoutSource.asObservable();
  logout() {

    this.refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    }

    console.log(this.refreshTokenPayload)
    this.httpClient.post(environmentCustom.address + "/api/auth/logout", this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(
        (data) => {
          this._logoutSource.next(true);
          this.localStorage.clear('authenticationToken');
          this.localStorage.clear('username');
          this.localStorage.clear('refreshToken');
          this.localStorage.clear('expiresAt');
        }, error => {
        throwError(error);
      })
  }


  refreshToken() {

    this.refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    }

    return this.httpClient.post<LoginResponse>(environmentCustom.address + '/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('authenticationToken',
          response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

// change password
changePassword(changePasswordRequest: ChangePasswordRequest): void {
  this.httpClient
    .put<ChangePasswordResponse>(environmentCustom.address + "/api/newpass", changePasswordRequest)
    .subscribe(data => {
      // this.localStorage.store('authenticationToken', data.authenticationToken);
      // this.localStorage.store('username', data.username);
      // this.localStorage.store('refreshToken', data.refreshToken);
      // this.localStorage.store('expiresAt', data.expiresAt);
      // this._loginSource.next(true);
      
      this._snackBar.open(data.message, '', {duration: 6000});
    },
    (err) => {
      this._snackBar.open('Password not changed... Please try again.', '', {duration: 6000});
    })
}

  getUsers(): Observable<string[]> {
    return this.httpClient.get<string[]>(environmentCustom.address + "/api/all-data/users");
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  getUserName(): string {
    return this.localStorage.retrieve('username');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
