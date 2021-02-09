import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageListService {
  constructor(private http: HttpClient) {}

  getChildren(): Observable<PackagesNames> {
    //return this.http.get<Packages>('http://localhost:8080/api/packages');
    return this.http.get<PackagesNames>('http://localhost:8080/api2/packages');
  }

  getStorage(): Observable<Packages> {
    return this.http.get<Packages>('http://localhost:8080/api/storage');
  }

  createPackage(name: string): Observable<any> {
    return this.http.post<string>('http://localhost:8080/api/packages', name);
  }
}

export interface PackagesNames {
  packagesNames: string[];
}

export interface Packages {
  children: Package[];
}

export interface Package {
  relative: string;
  order: number;
}
