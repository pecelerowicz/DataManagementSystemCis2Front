import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddMyInfoToOwnedProjectRequest, AddMyInfoToOwnedProjectResponse, AddUserRequest, AddUserResponse, CreateProjectRequest, CreateProjectResponse, DeleteOwnedProjectRequest, GetProjectResponse, GetProjectsResponse, RemoveInfoFromOwnedProjectRequest, RemoveInfoFromOwnedProjectResponse, RemoveMyInfoFromOtherProjectRequest, RemoveMyInfoFromOtherProjectResponse, RemoveUserFromOwnedProjectRequest, RemoveUserFromOwnedProjectResponse, UpdateProjectRequest, UpdateProjectResponse } from '../dto/my_project';
import { environmentCustom } from 'src/environments/environment.custom';
import { GetInfoListResponse, GetInfoResponse } from '../dto/info/info';
import { Node } from '../dto/my_data';
import * as fileSaver from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MyProjectsService {

  constructor(private httpClient: HttpClient,
              private _snackBar: MatSnackBar) { }

  private projectAddressPrefixMyProjects: string =  environmentCustom.address + '/api/my-projects/project';
  private baseUrl =  environmentCustom.address + '/api';

  getOwnedProjects(): Observable<GetProjectsResponse> {
    return this.httpClient.get<GetProjectsResponse>(this.projectAddressPrefixMyProjects);
  }

  getOwnedProject(id: number): Observable<GetProjectResponse> {
    return this.httpClient.get<GetProjectResponse>(this.projectAddressPrefixMyProjects + '/' + id);
  }

  createOwnedProject(payload: CreateProjectRequest): Observable<CreateProjectResponse> {
    return this.httpClient.post<CreateProjectResponse>(this.projectAddressPrefixMyProjects, payload);
  }

  deleteOwnedProject(payload: DeleteOwnedProjectRequest): Observable<GetProjectsResponse> {
    return this.httpClient.request<GetProjectsResponse>('delete', this.projectAddressPrefixMyProjects, {body: payload});
  }

  updateOwnedProject(payload: UpdateProjectRequest): Observable<UpdateProjectResponse> {
    return this.httpClient.put<UpdateProjectResponse>(this.projectAddressPrefixMyProjects, payload);
  }

  addUserToOwnedProject(payload: AddUserRequest): Observable<AddUserResponse> {
    return this.httpClient.post<AddUserResponse>(this.projectAddressPrefixMyProjects + '/user', payload);
  }

  removeUserFromOwnedProject(payload: RemoveUserFromOwnedProjectRequest): Observable<RemoveUserFromOwnedProjectResponse> {
    return this.httpClient.request<RemoveUserFromOwnedProjectResponse>('delete', this.projectAddressPrefixMyProjects + '/user', {body: payload});
  }

  getInfoList(): Observable<GetInfoListResponse> {
    return this.httpClient.get<GetInfoListResponse>(this.projectAddressPrefixMyProjects + '/info');
  }

  addMyInfoToOwnedProject(payload: AddMyInfoToOwnedProjectRequest): Observable<AddMyInfoToOwnedProjectResponse> {
    return this.httpClient.post<AddMyInfoToOwnedProjectResponse>(this.projectAddressPrefixMyProjects + '/info', payload); 
  }

  removeInfoFromOwnedProject(payload: RemoveInfoFromOwnedProjectRequest): Observable<RemoveInfoFromOwnedProjectResponse> {
    return this.httpClient.request<RemoveInfoFromOwnedProjectResponse>('delete', this.projectAddressPrefixMyProjects + '/info', {body: payload});
  }
  
  getInfoOfUserInProject(projectId: number, userName: string, infoName: string): Observable<GetInfoResponse> {
    return this.httpClient.get<GetInfoResponse>(this.projectAddressPrefixMyProjects + '/packages/info/' + projectId + '/' + userName + '/' + infoName);
  }

  getPackageFolderStructureOfUserAndProject(projectId: number, userName: string, infoName: string): Observable<Node> {
    return this.httpClient.get<Node>(this.projectAddressPrefixMyProjects + '/packages/folder/' + projectId + '/' + userName + '/' + infoName);
  }

  downloadFileOfProject(projectId: number, userName: string, infoName: string, fileNameWithPath: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    let params = new HttpParams();
    params = params.append('projectId', projectId + ''); // ugly casting/conversion
    params = params.append('userName', userName);
    params = params.append('infoName', infoName);
    //params = params.append('folderPath', folderPath);
    params = params.append('fileNameWithPath', fileNameWithPath);

    this.openSnackBar("Buffering download","It might take up to a few minutes", 100000)

    this.httpClient.get(this.baseUrl + "/my-projects/download", { 
        reportProgress: true,
        observe: 'events',
        responseType: 'blob',
        headers: headers, 
        params: params 
      })
      .subscribe(
      val => {
        if(val.type == HttpEventType.Response) {
          let contentDisposition = val.headers.get('content-disposition');
          let filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
          fileSaver.saveAs(new File([val.body], filename));
          this.openSnackBar("Download started", "", 6000);
        }
      }
    );
  }

  openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, {duration: duration});
  }

}
