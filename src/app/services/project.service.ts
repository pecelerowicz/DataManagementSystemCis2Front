import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddMyInfoToOtherProjectRequest, AddMyInfoToOtherProjectResponse, AddMyInfoToOwnedProjectRequest, AddMyInfoToOwnedProjectResponse, AddUserRequest, AddUserResponse, CreateProjectRequest, CreateProjectResponse, GetProjectResponse, GetProjectsResponse, RemoveInfoFromOwnedProjectRequest, RemoveInfoFromOwnedProjectResponse, RemoveMyInfoFromOtherProjectRequest, RemoveMyInfoFromOtherProjectResponse, RemoveUserFromOwnedProjectRequest, RemoveUserFromOwnedProjectResponse, UpdateProjectRequest, UpdateProjectResponse } from '../dto/my_project';
import { environmentCustom } from 'src/environments/environment.custom';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }
  private projectAddressPrefix: string =  environmentCustom.address + '/api/project';
  private projectAddressAllPrefix: string =  environmentCustom.address + '/api/project/all';

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

  removeUserFromOwnedProject(payload: RemoveUserFromOwnedProjectRequest): Observable<RemoveUserFromOwnedProjectResponse> {
    return this.httpClient.request<RemoveUserFromOwnedProjectResponse>('delete', this.projectAddressPrefix + '/user', {body: payload});
  }

  addMyInfoToOwnedProject(payload: AddMyInfoToOwnedProjectRequest): Observable<AddMyInfoToOwnedProjectResponse> {
    return this.httpClient.post<AddMyInfoToOwnedProjectResponse>(this.projectAddressPrefix + '/info', payload); 
  }

  removeInfoFromOwnedProject(payload: RemoveInfoFromOwnedProjectRequest): Observable<RemoveInfoFromOwnedProjectResponse> {
    return this.httpClient.request<RemoveInfoFromOwnedProjectResponse>('delete', this.projectAddressPrefix + '/info', {body: payload});
  }

  // OTHER PROJECTS
  getProject(id: number): Observable<GetProjectResponse> {
    return this.httpClient.get<GetProjectResponse>(this.projectAddressAllPrefix + '/' + id);
  }

  getProjects(): Observable<GetProjectsResponse> {
    return this.httpClient.get<GetProjectsResponse>(this.projectAddressAllPrefix);
  }

  addMyInfoToOtherProject(payload: AddMyInfoToOtherProjectRequest): Observable<AddMyInfoToOtherProjectResponse> {
    return this.httpClient.post<AddMyInfoToOwnedProjectResponse>(this.projectAddressAllPrefix + '/info', payload);
  }

  removeMyInfoFromOtherProject(payload: RemoveMyInfoFromOtherProjectRequest): Observable<RemoveMyInfoFromOtherProjectResponse> {
    return this.httpClient.request<RemoveMyInfoFromOtherProjectResponse>('delete', this.projectAddressAllPrefix + '/info', {body: payload});
  }
}
