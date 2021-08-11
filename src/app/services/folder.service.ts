import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentCustom } from 'src/environments/environment.custom';
import { Node } from '../dto/storage';
import { CreateFolderRequest, CreateFolderResponse, DeleteItemRequest, DeleteItemResponse } from '../dto/my_folder';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(private http: HttpClient) { }

  private foldersAddress: string = environmentCustom.address + "/api/folders";

  getPackageFolderStructure(packageName: string): Observable<Node> {
    return this.http.get<Node>(this.foldersAddress + "/" + packageName);
  }

  getPackageFolderStructureOfUser(userName: string, packageName: string): Observable<Node> {
    return this.http.get<Node>(this.foldersAddress + "/" + userName + "/" + packageName);
  }

  createFolder(newFolderName: string, parentFolderRelativePath: string, packageName: string): Observable<CreateFolderResponse> {
    let payload: CreateFolderRequest = 
      {newFolderName: newFolderName, packageName: packageName, 
        parentFolderRelativePath: parentFolderRelativePath};
    return this.http.post<CreateFolderResponse>(this.foldersAddress, payload);
  }

  deleteFolder(deleteFolderRequest: DeleteFolderRequest): Observable<DeleteFolderResponse> {
    return this.http.request<DeleteFolderResponse>('delete', this.foldersAddress, {body: deleteFolderRequest});
  }
}
