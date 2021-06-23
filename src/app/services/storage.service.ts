import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateStorageRequest, CreateStorageResponse } from '../dto/my_storage';
import { environmentCustom } from 'src/environments/environment.custom';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) { }

  private storageAddress: string = environmentCustom.address + '/api/storage';

  createStorage(createStorageRequest: CreateStorageRequest): Observable<CreateStorageResponse> {
    return this.http.post<CreateStorageResponse>(this.storageAddress, createStorageRequest);
  }
}
