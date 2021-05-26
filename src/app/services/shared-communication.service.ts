import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedCommunicationService {

  constructor() { }

  passParam: {name: string, path: string, order: number, packageName: string, folderPath: string} = 
  {name: '', path: '', order: 0, packageName: '', folderPath: ''};
  componentChangeEmitter = new EventEmitter();

  createPackageEmitter = new EventEmitter();

  public updateListOfPackages$: Subject<void> = new Subject();

  fromListToStorage: {name: string} = {name: ''};

  fromListToMetadata: {name: string} = {name: ''};

  public updateListOfFolders$: Subject<void> = new Subject();

  uploadBackEmitter = new EventEmitter();
}
