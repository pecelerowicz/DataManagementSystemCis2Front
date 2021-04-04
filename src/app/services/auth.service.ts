import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../components/register/register.request';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequest } from '../components/login/login-request';
import { LoginResponse } from '../components/login/login-response';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // private address: string = "localhost";
  private address: string = "134.122.73.65"

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  signup(registerRequest: RegisterRequest): Observable<any> {
    //any?
    return this.httpClient.post(
      'http://' + this.address + ':8080/api/auth/signup',
      registerRequest,
      { responseType: 'text' }
    );
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.httpClient
      .post<LoginResponse>('http://' + this.address + ':8080/api/auth/signup', loginRequest)
      .pipe(
        map((data) => {
          this.localStorage.store(
            'authenticationToken',
            data.authenticationToken
          );
          this.localStorage.store('username', data.username);
          this.localStorage.store('refreshToken', data.refreshToken);
          this.localStorage.store('expiresAt', data.expiresAt);
          return true;
        })
      );
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }
}
