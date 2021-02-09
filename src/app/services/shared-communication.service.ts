import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedCommunicationService {

  constructor() { }

  passParam: {name: string, path: string} = {name: '', path: ''};
  componentChangeEmitter = new EventEmitter();

  createPackageEmitter = new EventEmitter();

  public updateListOfPackages$: Subject<void> = new Subject();
  
}
