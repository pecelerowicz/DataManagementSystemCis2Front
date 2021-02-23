import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Node } from '../dto/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private http: HttpClient) { }
  getStorage(): Observable<Node> {
    return this.http.get<Node>('http://localhost:8080/api/folders');
  }
}
