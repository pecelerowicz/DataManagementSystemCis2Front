import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddMyInfoToOtherProjectRequest, AddMyInfoToOtherProjectResponse, AddMyInfoToOwnedProjectResponse, GetProjectResponse, GetProjectsResponse, RemoveMyInfoFromOtherProjectRequest, RemoveMyInfoFromOtherProjectResponse } from '../dto/my_project';
import { environmentCustom } from 'src/environments/environment.custom';
import { GetInfoListResponse, GetInfoResponse } from '../dto/info/info';
import { Node } from '../dto/my_data';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as fileSaver from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class AllProjectsService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  private projectAddressPrefixAllProjects: string =  environmentCustom.address + '/api/all-projects/project';
  private infoAddressPrefixAllProjects: string = environmentCustom.address + '/api/all-projects';
  private baseUrl =  environmentCustom.address + '/api';

  getProject(id: number): Observable<GetProjectResponse> {
    return this.http.get<GetProjectResponse>(this.projectAddressPrefixAllProjects + '/' + id);
  }

  getProjects(): Observable<GetProjectsResponse> {
    return this.http.get<GetProjectsResponse>(this.projectAddressPrefixAllProjects);
  }

  getInfoList(): Observable<GetInfoListResponse> {
    return this.http.get<GetInfoListResponse>(this.infoAddressPrefixAllProjects + '/info');
  }

  addMyInfoToOtherProject(payload: AddMyInfoToOtherProjectRequest): Observable<AddMyInfoToOtherProjectResponse> {
    return this.http.post<AddMyInfoToOwnedProjectResponse>(this.projectAddressPrefixAllProjects + '/info', payload);
  }

  removeMyInfoFromOtherProject(payload: RemoveMyInfoFromOtherProjectRequest): Observable<RemoveMyInfoFromOtherProjectResponse> {
    return this.http.request<RemoveMyInfoFromOtherProjectResponse>('delete', this.projectAddressPrefixAllProjects + '/info', {body: payload});
  }

  getInfoOfUserAndProject(projectId: number, userName: string, infoName: string): Observable<GetInfoResponse> {
    return this.http.get<GetInfoResponse>(this.projectAddressPrefixAllProjects + '/packages/info/' + projectId + '/' + userName + '/' + infoName);
  }

  getPackageFolderStructureOfUserAndProject(projectId: number, userName: string, infoName: string): Observable<Node> {
    return this.http.get<Node>(this.projectAddressPrefixAllProjects + '/packages/folder/' + projectId + '/' + userName + '/' + infoName);
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

    this.http.get(this.baseUrl + "/all-projects/download", { 
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
