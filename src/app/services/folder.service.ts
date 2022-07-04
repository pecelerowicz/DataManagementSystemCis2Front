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
  private foldersAddressMyData: string = environmentCustom.address + "/api/my-data/folders";
  private foldersAddressAllData: string = environmentCustom.address + "/api/all-data/folders";

  getPackageFolderStructure(packageName: string): Observable<Node> {
    return this.http.get<Node>(this.foldersAddressMyData + "/" + packageName);
  }

  getPackageFolderStructureOfUser(userName: string, packageName: string): Observable<Node> {
    return this.http.get<Node>(this.foldersAddressAllData + "/" + userName + "/" + packageName);
  }

  createFolder(newFolderName: string, parentFolderRelativePath: string, packageName: string): Observable<CreateFolderResponse> {
    let payload: CreateFolderRequest = 
      {newFolderName: newFolderName, packageName: packageName, 
        parentFolderRelativePath: parentFolderRelativePath};
    return this.http.post<CreateFolderResponse>(this.foldersAddressMyData, payload);
  }

  deleteFolder(deleteFolderRequest: DeleteItemRequest): Observable<DeleteItemResponse> {
    return this.http.request<DeleteItemResponse>('delete', this.foldersAddressMyData, {body: deleteFolderRequest});
  }
}
