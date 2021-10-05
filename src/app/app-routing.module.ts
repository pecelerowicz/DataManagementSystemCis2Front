import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { RegisterComponent } from '../app/components/register/register.component';
import { AllProjectsComponent } from './components/all-projects/all-projects.component';
import { FolderComponent } from './components/home/folder/folder.component';
import { HomeComponent } from './components/home/home.component';
import { InfoComponent } from './components/home/info/info.component';
import { UploadComponent } from './components/home/upload/upload.component';
import { DescriptionComponent } from './components/my-projects/description/description.component';
import { MembersComponent } from './components/my-projects/members/members.component';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';
import { PackagesComponent } from './components/my-projects/packages/packages.component';
import { SearchFolderComponent } from './components/search/search-folder/search-folder.component';
import { SearchInfoComponent } from './components/search/search-info/search-info.component';
import { SearchComponent } from './components/search/search.component';
import { DescriptionAllComponent } from './components/all-projects/description-all/description-all.component';
import { MembersAllComponent } from './components/all-projects/members-all/members-all.component';
import { PackagesAllComponent } from './components/all-projects/packages-all/packages-all.component';

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
        component: FolderComponent,
      },
      {
        path: 'upload',
        component: UploadComponent,
      }
    ],
  },
  {
    path: 'search',
    component: SearchComponent,
    children: [
      {
        path: 'info/:order',
        component: SearchInfoComponent
      },
      {
        path: 'storage/:order',
        component: SearchFolderComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'my-projects',
    component: MyProjectsComponent,
    children: [
      {
        path: 'description/:id',
        component: DescriptionComponent
      },
      {
        path: 'members/:id',
        component: MembersComponent
      },
      {
        path: 'packages/:id',
        component: PackagesComponent
      }
    ]
  }, 
  {
    path: 'all-projects',
    component: AllProjectsComponent,
    children: [
      {
        path: 'description/:id',
        component: DescriptionAllComponent
      },
      {
        path: 'members/:id',
        component: MembersAllComponent
      },
      {
        path: 'packages/:id',
        component: PackagesAllComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
