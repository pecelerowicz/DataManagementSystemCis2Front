import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageListService {
  constructor(private http: HttpClient) {}

  getChildren(): Observable<Packages> {
    return this.http.get<Packages>('http://localhost:8080/api/packages');
  }
}

export interface Packages {
  children: Package[];
}

export interface Package {
  relative: string;
}
