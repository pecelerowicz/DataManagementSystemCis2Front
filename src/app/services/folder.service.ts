import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentCustom } from 'src/environments/environment.custom';
import { Node } from '../dto/storage';
import { CreateFolderRequest, CreateFolderResponse } from '../dto/my_folder';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(private http: HttpClient) { }

  private foldersAddress: string = environmentCustom.address + "/api/folders";

  private fullFoldersAddress: string = environmentCustom.address + '/api/full-folders';
  private packageFoldersAddress: string = environmentCustom.address + '/api/package-folders';

  getFullFolderStructure(): Observable<Node> {
    return this.http.get<Node>(this.fullFoldersAddress);
  }

  getPackageFolderStructure(packageName: string): Observable<Node> {
    return this.http.get<Node>(this.packageFoldersAddress + "/" + packageName);
  }

  createFolder(newFolderName: string, parentFolderRelativePath: string, packageName: string): Observable<CreateFolderResponse> {
    let payload: CreateFolderRequest = 
      {newFolderName: newFolderName, packageName: packageName, 
        parentFolderRelativePath: parentFolderRelativePath};
    return this.http.post<CreateFolderResponse>(this.foldersAddress, payload);
  }
}
