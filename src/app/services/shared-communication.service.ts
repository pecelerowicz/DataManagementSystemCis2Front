import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedCommunicationService {

  constructor() { }

  passParam: {name: string, path: string} = {name: '', path: ''};
  componentChangeEmitter = new EventEmitter();
  
}
