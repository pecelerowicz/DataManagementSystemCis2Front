import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
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
import { CreatePackageDialog } from './components/home/package/package.component';
import { DeletePackageDialog } from './components/home/package/package.component';
import { CreateFolderDialog } from './components/home/folder/folder.component';
import { ShortenPathPipe } from './pipes/shorten-path.pipe';
import { HeaderComponent } from './components/header/header.component';
import { TestStepComponent } from './components/home/info/test-step/test-step.component';
import { FolderComponent } from './components/home/folder/folder.component';
import { PackageComponent } from './components/home/package/package.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PasswordStrengthDirective,
    OnlyOneErrorPipe,
    ShortenPathPipe,
    HomeComponent,
    InfoComponent,
    UploadComponent,
    CreatePackageDialog,
    DeletePackageDialog,
    CreateFolderDialog,
    HeaderComponent,
    TestStepComponent,
    FolderComponent,
    PackageComponent
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
