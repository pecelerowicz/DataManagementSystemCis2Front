import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoDto } from '../dto/info';
import { environmentCustom } from 'src/environments/environment.custom';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private httpClient: HttpClient) { }

  private infoAddressPrefix: string = environmentCustom.address + '/api/package-info'

  getPackageInfo(infoName: string): Observable<InfoDto> {
    let infoAddress: string = this.infoAddressPrefix + '/' + infoName;
    return this.httpClient.get<InfoDto>(infoAddress);
  }

  savePackageInfo(infoDto: InfoDto): Observable<InfoDto> {
    let infoAddress: string = this.infoAddressPrefix;
    return this.httpClient.put<InfoDto>(infoAddress, infoDto);
  }
}
