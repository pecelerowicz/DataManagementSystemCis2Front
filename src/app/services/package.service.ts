import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeletePackageRequest, GetPackageListResponseX } from '../dto/storage-list';
import { environmentCustom } from 'src/environments/environment.custom';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) { }

  private packageAddress: string = environmentCustom.address + "/api/package";

  getPackageList(): Observable<GetPackageListResponseX> {
    return this.http.get<GetPackageListResponseX>(this.packageAddress);
  }

  deletePackage(name: string): Observable<any> { //?
    let payload: DeletePackageRequest = {packageName: name};
    return this.http.request('delete', this.packageAddress, {body: payload});
  }
}
