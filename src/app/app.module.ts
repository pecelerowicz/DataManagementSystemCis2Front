import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordStrengthDirective } from './directives/password-strength.directive';
import { OnlyOneErrorPipe } from './pipes/only-one-error.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HomeComponent } from './components/home/home.component';
import { TokenInterceptor } from './token-interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InfoComponent } from './components/home/info/info.component';
import { UploadComponent } from './components/home/upload/upload.component';
import { CreatePackageDialogComponent } from './components/home/package/dialogs/create-package-dialog/create-package-dialog.component';
import { CreateMetadataDialogComponent } from './components/home/package/dialogs/create-metadata-dialog/create-metadata-dialog.component';
import { CreateFolderDialog, DownloadDialog } from './components/home/folder/folder.component';
import { DownloadSearchDialog } from './components/search/search-folder/search-folder.component';
import { DeleteFolderDialog } from './components/home/folder/folder.component';
import { ShortenPathPipe } from './pipes/shorten-path.pipe';
import { ShortenNamePipe } from './pipes/shorten-name.pipe';
import { HeaderComponent } from './components/header/header.component';
import { TestStepComponent } from './components/home/info/test-step/test-step.component';
import { FolderComponent } from './components/home/folder/folder.component';
import { PackageComponent } from './components/home/package/package.component';
import { DeletePackageDialogComponent } from './components/home/package/dialogs/delete-package-dialog/delete-package-dialog.component';
import { SearchComponent } from './components/search/search.component';
import { SearchPackageComponent } from './components/search/search-package/search-package.component';
import { SearchInfoComponent } from './components/search/search-info/search-info.component';
import { SearchFolderComponent } from './components/search/search-folder/search-folder.component';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';
import { DownloadDialogMyProject } from './components/my-projects/packages-folder/packages-folder.component';
import { ProjectsListComponent } from './components/my-projects/projects-list/projects-list.component';
import { CreateProjectDialogComponent } from './components/my-projects/projects-list/dialogs/create-project-dialog/create-project-dialog.component';
import { DescriptionComponent } from './components/my-projects/description/description.component';
import { MembersComponent } from './components/my-projects/members/members.component';
import { PackagesComponent } from './components/my-projects/packages/packages.component';
import { RemovePackageDialogComponent } from './components/my-projects/packages/dialogs/remove-package-dialog/remove-package-dialog.component';
import { AllProjectsComponent } from './components/all-projects/all-projects.component';
import { ProjectListAllComponent } from './components/all-projects/project-list-all/project-list-all.component';
import { PackagesAllComponent } from './components/all-projects/packages-all/packages-all.component';
import { MembersAllComponent } from './components/all-projects/members-all/members-all.component';
import { DescriptionAllComponent } from './components/all-projects/description-all/description-all.component';
import { PackagesInfoComponent } from './components/my-projects/packages-info/packages-info.component';
import { PackagesFolderComponent } from './components/my-projects/packages-folder/packages-folder.component';
import { PackagesInfoAllComponent } from './components/all-projects/packages-info-all/packages-info-all.component';
import { PackagesFolderAllComponent } from './components/all-projects/packages-folder-all/packages-folder-all.component';
import { DeleteProjectDialogComponent } from './components/my-projects/projects-list/dialogs/delete-project-dialog/delete-project-dialog.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FilterComponent } from './components/reusable/filter/filter.component';
import { RenamePackageDialogComponent } from './components/home/package/dialogs/rename-package-dialog/rename-package-dialog.component';
import { ArchivePackageDialogComponent } from './components/home/package/dialogs/archive-package-dialog/archive-package-dialog.component';
import { DownloadTemDialog, TemFolderComponent } from './components/tem/tem-folder/tem-folder.component';

import { TemFolderService } from './services/tem-folder.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PasswordStrengthDirective,
    OnlyOneErrorPipe,
    ShortenPathPipe,
    ShortenNamePipe,
    HomeComponent,
    InfoComponent,
    UploadComponent,
    CreatePackageDialogComponent,
    CreateMetadataDialogComponent,
    CreateFolderDialog,
    DeleteFolderDialog,
    HeaderComponent,
    TestStepComponent,
    FolderComponent,
    PackageComponent,
    DeletePackageDialogComponent,
    SearchComponent,
    SearchPackageComponent,
    SearchInfoComponent,
    SearchFolderComponent,
    MyProjectsComponent,
    DownloadDialogMyProject,
    ProjectsListComponent,
    CreateProjectDialogComponent,
    DescriptionComponent,
    MembersComponent,
    PackagesComponent,
    RemovePackageDialogComponent,
    AllProjectsComponent,
    ProjectListAllComponent,
    PackagesAllComponent,
    MembersAllComponent,
    DescriptionAllComponent,
    PackagesInfoComponent,
    PackagesFolderComponent,
    PackagesInfoAllComponent,
    PackagesFolderAllComponent,
    DeleteProjectDialogComponent,
    ChangePasswordComponent,
    FilterComponent,
    RenamePackageDialogComponent,
    ArchivePackageDialogComponent,
    TemFolderComponent,
    DownloadTemDialog, 
    DownloadDialog,
    DownloadSearchDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    FlexLayoutModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    TemFolderService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
