import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ChangePasswordRequest, ChangePasswordResponse } from "../dto/my_auth";
import { environmentCustom } from 'src/environments/environment.custom';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root',
})
export class NewPassService {

    constructor(
        private httpClient: HttpClient,
        private _snackBar: MatSnackBar
    ) {}

// change password
changePassword(changePasswordRequest: ChangePasswordRequest): void {
    this.httpClient
      .put<ChangePasswordResponse>(environmentCustom.address + "/api/test/newpass", changePasswordRequest)
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



}