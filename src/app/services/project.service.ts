import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProjectRequest, CreateProjectResponse, GetProjectsResponse } from '../dto/my_project';
import { environmentCustom } from 'src/environments/environment.custom';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }
  private projectAddressPrefix: string =  environmentCustom.address + '/api/project';

  getOwnedProjects(): Observable<GetProjectsResponse> {
    return this.httpClient.get<GetProjectsResponse>(this.projectAddressPrefix);
  }

  createOwnedProject(payload: CreateProjectRequest): Observable<CreateProjectResponse> {
    return this.httpClient.post<CreateProjectResponse>(this.projectAddressPrefix, payload);
  }
}
