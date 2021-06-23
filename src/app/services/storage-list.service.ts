import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateFolderRequest, CreateFolderResponse, DeletePackageRequest,CreateStorageRequest, CreateStorageResponse, 
  CreateMetadataResponse, CreateMetadataRequest, GetPackageListResponseX } from '../dto/storage-list';
import { environmentCustom } from 'src/environments/environment.custom';

@Injectable({
  providedIn: 'root',
})
export class StorageListService {
  constructor(private http: HttpClient) {}

  private storageAddress: string = environmentCustom.address + '/api/storage';

  createStorage(storageName: string): Observable<CreateStorageResponse> {
    let payload: CreateStorageRequest = {storageName: storageName};
    return this.http.post<CreateStorageRequest>(this.storageAddress, payload);
  }

  
  //
  
  private foldersAddress: string = environmentCustom.address + "/api/folders";
  private metadataAddress: string = environmentCustom.address + '/api/metadata';


  createFolder(newFolderName: string, parentFolderRelativePath: string, packageName: string): Observable<CreateFolderResponse> {
    let payload: CreateFolderRequest = 
      {newFolderName: newFolderName, packageName: packageName, 
        parentFolderRelativePath: parentFolderRelativePath};
    return this.http.post<CreateFolderResponse>(this.foldersAddress, payload);
  }


  createMetadata(metadataName: string): Observable<CreateMetadataResponse> {
    let payload: CreateMetadataRequest = {metadataName: metadataName};
    return this.http.post<CreateMetadataRequest>(this.metadataAddress, payload);
  }

}



