import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentCustom } from 'src/environments/environment.custom';
import { GetSearchListResponse, GetSearchListRequest } from 'src/app/dto/my_search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  getTypes(): Observable<string[]> {
    return this.httpClient.get<string[]>(environmentCustom.address + "/api/search/types")
  }

  getSearchList(getSearchListRequest: GetSearchListRequest): Observable<GetSearchListResponse> {
    return this.httpClient.post<GetSearchListResponse>(environmentCustom.address + "/api/search", getSearchListRequest);
  }
}
