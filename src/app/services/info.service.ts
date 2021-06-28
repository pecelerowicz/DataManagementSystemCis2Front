import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmentCustom } from 'src/environments/environment.custom';
import { CreateMetadataRequest, CreateMetadataResponse } from '../dto/storage-list';
import { GetInfoResponse, UpdateInfoRequest, UpdateInfoResponse } from '../dto/info/info'
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

  updateInfo(updateInfoRequest: UpdateInfoRequest): Observable<UpdateInfoResponse> {
    let infoAddress: string = this.infoAddressPrefix;
    return this.httpClient.put<UpdateInfoResponse>(infoAddress, updateInfoRequest);
  }

  private metadataAddress: string = environmentCustom.address + '/api/metadata';

  createMetadata(metadataName: string): Observable<CreateMetadataResponse> {
    let payload: CreateMetadataRequest = {metadataName: metadataName};
    return this.httpClient.post<CreateMetadataRequest>(this.metadataAddress, payload);
  }
}
