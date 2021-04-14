import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  isLoggedIn: boolean = this.localStorage.retrieve('username')!=null;
  username: string = this.localStorage.retrieve('username')==null ? '' : this.localStorage.retrieve('username');

  constructor(private router: Router, private authService: AuthService, private localStorage: LocalStorageService) {}

  ngOnInit() {
    this.authService.login$.subscribe(
      value => {
        this.isLoggedIn = true;
        this.username = this.localStorage.retrieve('username');
        this.router.navigate(['/home']);
      }
    )
    this.authService.logout$.subscribe(
      value => {
        this.isLoggedIn = false;
        this.username = '';
        this.router.navigate(['/login']);
      }
    )
  }

}
