import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Node } from '../dto/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private http: HttpClient) { }
  getFullFolderStructure(): Observable<Node> {
    return this.http.get<Node>('http://localhost:8080/api/full-folders');
  }

  getPackageFolderStructure(packageName: string): Observable<Node> {
    return this.http.get<Node>('http://localhost:8080/api/package-folders' + "/" + packageName);
  }

}
