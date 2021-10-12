import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CreateProjectRequest } from '../dto/my_project';

@Injectable({
  providedIn: 'root'
})
export class SharedCommunicationService {

  constructor() { }

  passParam: {name: string, path: string, order: number, packageName: string, folderPath: string} = 
  {name: '', path: '', order: 0, packageName: '', folderPath: ''};
  componentChangeEmitter = new EventEmitter();

  createPackageEmitter = new EventEmitter();

  public _createMetadataInDialogSource: Subject<{order: number, name: string}> 
      = new Subject<{order: number, name: string}>();
  public createMetadataInDialog$ = this._createMetadataInDialogSource.asObservable();

  public updateListOfPackages$: Subject<void> = new Subject();

  fromListToStorage: {name: string} = {name: ''};

  fromListToMetadata: {name: string} = {name: ''};

  public updateListOfFolders$: Subject<void> = new Subject();

  uploadBackEmitter = new EventEmitter();

  fromSearchToMetadata: {position: number, name: string, username: string}
   = {position: 0, name: '', username: ''};

  fromSearchToStorage: {position: number, name: string, username: string}
   = {position: 0, name: '', username: ''};

  public _createProjectSource: Subject<CreateProjectRequest> 
      = new Subject<CreateProjectRequest>();
  public createProject$ = this._createProjectSource.asObservable();

  public updateListOfPackagesInProject$: Subject<void> = new Subject();

  //

  public fromMyProjectsPackagesToPackagesInfo: Subject<void> = new Subject();
  public fromMyProjectsPackagesToPackagesInfoData: {projectId: number, infoName: string, userName: string} = {projectId: -1, infoName: '', userName: ''};

  public fromAllProjectsPackagesToPackagesInfo: Subject<void> = new Subject();
  public fromAllProjectsPackagesToPackagesInfoData: {projectId: number, infoName: string, userName: string} = {projectId: -1, infoName: '', userName: ''};

  public fromMyProjectsPackagesToPackagesFolder: Subject<void> = new Subject();
  public fromMyProjectsPackagesToPackagesFolderData: {projectId: number, infoName: string, userName: string} = {projectId: -1, infoName: '', userName: ''};

  public fromAllProjectsPackagesToPackagesFolder: Subject<void> = new Subject();
  public fromAllProjectsPackagesToPackagesFolderData: {projectId: number, infoName: string, userName: string} = {projectId: -1, infoName: '', userName: ''};

  public updateListOfProjects$: Subject<void> = new Subject();
}
