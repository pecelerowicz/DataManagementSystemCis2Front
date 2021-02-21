import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { RegisterComponent } from '../app/components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { InfoComponent } from './components/home/info/info.component';
import { StorageComponent } from './components/home/storage/storage.component';
import { UploadComponent } from './components/home/upload/upload.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'info/:order',
        component: InfoComponent,
      },
      {
        path: 'storage/:order',
        component: StorageComponent,
      },
      {
        path: 'upload',
        component: UploadComponent,
      }
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
