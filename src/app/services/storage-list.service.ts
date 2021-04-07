import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePackageRequest, CreatePackageResponse, PackagesResponse, 
  CreateFolderRequest, CreateFolderResponse, DeletePackageRequest, DeletePackageResponse, 
  StorageAndMetadataListResponse, CreateStorageRequest, CreateStorageResponse, 
  CreateMetadataResponse, CreateMetadataRequest } from '../dto/storage-list';
import { environmentCustom } from 'src/environments/environment.custom';

@Injectable({
  providedIn: 'root',
})
export class StorageListService {
  constructor(private http: HttpClient) {}

  private packageAddress: string = environmentCustom.address + "/api/package";
  private foldersAddress: string = environmentCustom.address + "/api/folders";
  private storageMetadataAddress: string = environmentCustom.address + '/api/storageMetadata';
  private storageAddress: string = environmentCustom.address + '/api/storage';
  private metadataAddress: string = environmentCustom.address + '/api/metadata';

  getPackagesNames(): Observable<PackagesResponse> {
    return this.http.get<PackagesResponse>(this.packageAddress);
  }

  createPackage(name: string): Observable<CreatePackageResponse> {
    let payload: CreatePackageRequest = {packageName: name};
    return this.http.post<CreatePackageResponse>(this.packageAddress, payload);
  }

  deletePackage(name: string): Observable<any> { //?
    let payload: DeletePackageRequest = {packageName: name};
    return this.http.request('delete', this.packageAddress, {body: payload});
  }

  createFolder(newFolderName: string, parentFolderRelativePath: string, packageName: string): Observable<CreateFolderResponse> {
    let payload: CreateFolderRequest = 
      {newFolderName: newFolderName, packageName: packageName, 
        parentFolderRelativePath: parentFolderRelativePath};
    return this.http.post<CreateFolderResponse>(this.foldersAddress, payload);
  }

  getStorageAndMetadata(): Observable<StorageAndMetadataListResponse> {
    return this.http.get<StorageAndMetadataListResponse>(this.storageMetadataAddress);
  }

  createStorage(storageName: string): Observable<CreateStorageResponse> {
    let payload: CreateStorageRequest = {storageName: storageName};
    return this.http.post<CreateStorageRequest>(this.storageAddress, payload);
  }

  createMetadata(metadataName: string): Observable<CreateMetadataResponse> {
    let payload: CreateMetadataRequest = {metadataName: metadataName};
    return this.http.post<CreateMetadataRequest>(this.metadataAddress, payload);
  }

}



