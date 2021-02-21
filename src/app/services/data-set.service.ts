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

  getMyDataSetsPagination(pageNumber: number, pageSize: number) {
    let url =
      'http://localhost:8080/api/dataSet/logged/' + pageNumber + '/' + pageSize;
    return this.http.get<DataSetModelApi>(url);
  }
}

export interface DataSetModel {
  id: number;
  name: string;
  description: string;
}

export interface DataSetModelApi {
  dataSetDtoList: DataSetModel[];
  total_count: number;
}
