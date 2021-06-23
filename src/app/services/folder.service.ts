import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentCustom } from 'src/environments/environment.custom';
import { Node } from '../dto/storage';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(private http: HttpClient) { }

  private fullFoldersAddress: string = environmentCustom.address + '/api/full-folders';
  private packageFoldersAddress: string = environmentCustom.address + '/api/package-folders';

  getFullFolderStructure(): Observable<Node> {
    return this.http.get<Node>(this.fullFoldersAddress);
  }

  getPackageFolderStructure(packageName: string): Observable<Node> {
    return this.http.get<Node>(this.packageFoldersAddress + "/" + packageName);
  }
}
