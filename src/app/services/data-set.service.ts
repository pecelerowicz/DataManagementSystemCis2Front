import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSetService {
  constructor(private http: HttpClient) {}
  getAllDataSets(): Observable<Array<DataSetModel>> {
    return this.http.get<Array<DataSetModel>>(
      'http://localhost:8080/api/dataSet'
    );
  }

  getMyDataSets(): Observable<Array<DataSetModel>> {
    return this.http.get<Array<DataSetModel>>(
      'http://localhost:8080/api/dataSet/logged'
    );
  }
}

export interface DataSetModel {
  id: number;
  name: string;
  description: string;
}
