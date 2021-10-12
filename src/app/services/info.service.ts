import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmentCustom } from 'src/environments/environment.custom';
// import { CreateMetadataRequest, CreateMetadataResponse } from '../dto/storage-list';
import { CreateInfoRequest, CreateInfoResponse, GetInfoListResponse, GetInfoResponse, UpdateInfoRequest, UpdateInfoResponse } from '../dto/info/info'
import { UpdateDifrInfoResponse } from '../dto/info/difr_info/difr_info';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private httpClient: HttpClient) { }

  private infoAddressPrefix: string = environmentCustom.address + '/api/info' 

  getInfo(infoName: string): Observable<GetInfoResponse> {
    let infoAddress: string = this.infoAddressPrefix + '/' + infoName;
    return this.httpClient.get<GetInfoResponse>(infoAddress);
  }

  getInfoList(): Observable<GetInfoListResponse> {
    return this.httpClient.get<GetInfoListResponse>(this.infoAddressPrefix)
  }

  updateInfo(updateInfoRequest: UpdateInfoRequest): Observable<UpdateInfoResponse> {
    let infoAddress: string = this.infoAddressPrefix;
    return this.httpClient.put<UpdateInfoResponse>(infoAddress, updateInfoRequest);
  }

  // private metadataAddress: string = environmentCustom.address + '/api/info';

  createMetadata(createInfoRequest: CreateInfoRequest): Observable<CreateInfoResponse> {
    // let payload: CreateMetadataRequest = {metadataName: metadataName};
    let infoAddress: string = this.infoAddressPrefix;
    return this.httpClient.post<CreateInfoResponse>(infoAddress, /*payload*/createInfoRequest);
  }

  getInfoOfUser(userName: string, infoName: string): Observable<GetInfoResponse> {
    let infoAddress: string = this.infoAddressPrefix + '/' + userName + '/' + infoName;
    return this.httpClient.get<GetInfoResponse>(infoAddress);
  }
}
