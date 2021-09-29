import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddUserRequest, AddUserResponse, CreateProjectRequest, CreateProjectResponse, GetProjectResponse, GetProjectsResponse, UpdateProjectRequest, UpdateProjectResponse } from '../dto/my_project';
import { environmentCustom } from 'src/environments/environment.custom';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }
  private projectAddressPrefix: string =  environmentCustom.address + '/api/project';

  getOwnedProject(id: number): Observable<GetProjectResponse> {
    return this.httpClient.get<GetProjectResponse>(this.projectAddressPrefix + '/' + id);
  }

  getOwnedProjects(): Observable<GetProjectsResponse> {
    return this.httpClient.get<GetProjectsResponse>(this.projectAddressPrefix);
  }

  createOwnedProject(payload: CreateProjectRequest): Observable<CreateProjectResponse> {
    return this.httpClient.post<CreateProjectResponse>(this.projectAddressPrefix, payload);
  }

  updateOwnedProject(payload: UpdateProjectRequest): Observable<UpdateProjectResponse> {
    return this.httpClient.put<UpdateProjectResponse>(this.projectAddressPrefix, payload);
  }

  addUserToOwnedProject(payload: AddUserRequest): Observable<AddUserResponse> {
    return this.httpClient.post<AddUserResponse>(this.projectAddressPrefix + '/user', payload);
  }
}
