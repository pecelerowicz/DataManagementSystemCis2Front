import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PingService {
  constructor(private http: HttpClient) {}

  getPing(): Observable<PingData> {
    return this.http.get<PingData>('http://localhost:8080/api/ping');
  }
}

export interface PingData {
  values: string[];
}
