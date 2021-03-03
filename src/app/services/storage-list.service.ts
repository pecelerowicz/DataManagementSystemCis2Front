import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePackageRequest, CreatePackageResponse, PackagesResponse, 
  CreateFolderRequest, CreateFolderResponse, DeletePackageRequest, DeletePackageResponse, 
  StorageAndMetadataListResponse, CreateStorageRequest, CreateStorageResponse } from '../dto/storage-list';

@Injectable({
  providedIn: 'root',
})
export class StorageListService {
  constructor(private http: HttpClient) {}

  getPackagesNames(): Observable<PackagesResponse> {
    return this.http.get<PackagesResponse>('http://localhost:8080/api/package');
  }

  createPackage(name: string): Observable<CreatePackageResponse> {
    let payload: CreatePackageRequest = {packageName: name};
    return this.http.post<CreatePackageResponse>('http://localhost:8080/api/package', payload);
  }

  deletePackage(name: string): Observable<any> { //?
    let payload: DeletePackageRequest = {packageName: name};
    return this.http.request('delete', 'http://localhost:8080/api/package', {body: payload});
  }

  createFolder(newFolderName: string, parentFolderFullPath: string): Observable<CreateFolderResponse> {
    let payload: CreateFolderRequest = 
      {newFolderName: newFolderName, parentFolderFullPath: parentFolderFullPath};
    return this.http.post<CreateFolderResponse>('http://localhost:8080/api/folders', payload);
  }

  getStorageAndMetadata(): Observable<StorageAndMetadataListResponse> {
    return this.http.get<StorageAndMetadataListResponse>('http://localhost:8080/api/storageMetadata');
  }

  createStorage(storageName: string): Observable<CreateStorageResponse> {
    let payload: CreateStorageRequest = {storageName: storageName};
    return this.http.post<CreateStorageRequest>('http://localhost:8080/api/storage', payload);
  }

}



