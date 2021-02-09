import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePackageRequest, CreatePackageResponse, PackagesResponse } from '../dto/storage-list';

@Injectable({
  providedIn: 'root',
})
export class StorageListService {
  constructor(private http: HttpClient) {}

  getPackagesNames(): Observable<PackagesResponse> {
    return this.http.get<PackagesResponse>('http://localhost:8080/api2/packages');
  }

  createPackage(name: string): Observable<CreatePackageResponse> {
    let payload: CreatePackageRequest = {packageName: name};
    return this.http.post<CreatePackageRequest>('http://localhost:8080/api2/packages', payload);
  }

}



