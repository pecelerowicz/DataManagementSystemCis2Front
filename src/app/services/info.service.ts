import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmentCustom } from 'src/environments/environment.custom';
import { CreateInfoRequest, CreateInfoResponse, GetInfoListResponse, GetInfoResponse, UpdateInfoRequest, UpdateInfoResponse } from '../dto/info/info'

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private httpClient: HttpClient) { }

  private infoAddressPrefix: string = environmentCustom.address + '/api/info' // todo: delete later
  private infoAddressPrefixMyData: string = environmentCustom.address + '/api/my-data/info'; // for refactor
  private infoAddressPrefixAllData: string = environmentCustom.address + '/api/all-data/info'; // for refactor
  private infoAddressPrefixMyProjects: string = environmentCustom.address + '/api/my-projects';


  getInfo(infoName: string): Observable<GetInfoResponse> {
    let infoAddress: string = this.infoAddressPrefixMyData + '/' + infoName;
    return this.httpClient.get<GetInfoResponse>(infoAddress);
  }

  getInfoList(): Observable<GetInfoListResponse> {
    return this.httpClient.get<GetInfoListResponse>(this.infoAddressPrefixMyProjects + '/info');
  }

  updateInfo(updateInfoRequest: UpdateInfoRequest): Observable<UpdateInfoResponse> {
    let infoAddress: string = this.infoAddressPrefixMyData;
    return this.httpClient.put<UpdateInfoResponse>(infoAddress, updateInfoRequest);
  }

  createMetadata(createInfoRequest: CreateInfoRequest): Observable<CreateInfoResponse> {
    let infoAddress: string = this.infoAddressPrefixMyData;
    return this.httpClient.post<CreateInfoResponse>(infoAddress, createInfoRequest);
  }

  getInfoOfUser(userName: string, infoName: string): Observable<GetInfoResponse> {
    let infoAddress: string = this.infoAddressPrefixAllData + '/' + userName + '/' + infoName;
    return this.httpClient.get<GetInfoResponse>(infoAddress);
  }
}
