import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePackageRequest, CreatePackageResponse, GetPackageListResponse } from '../dto/my_package';
import { DeletePackageRequest, DeletePackageResponse } from '../dto/my_package';
import { environmentCustom } from 'src/environments/environment.custom';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) { }

  private packageAddress: string = environmentCustom.address + "/api/package";

  getPackageList(): Observable<GetPackageListResponse> {
    return this.http.get<GetPackageListResponse>(this.packageAddress);
  }

  createPackage(createPackageRequest: CreatePackageRequest): Observable<CreatePackageResponse> {
    return this.http.post<CreatePackageResponse>(this.packageAddress, createPackageRequest);
  }

  deletePackage(deletePackageRequest: DeletePackageRequest): Observable<DeletePackageResponse> {
    return this.http.request<DeletePackageResponse>('delete', this.packageAddress, {body: deletePackageRequest});
  }
}
