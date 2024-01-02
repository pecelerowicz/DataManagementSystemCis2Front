import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentCustom } from 'src/environments/environment.custom';
import { GetSearchListResponse, GetSearchListRequest } from 'src/app/dto/all_data';
import { GetInfoResponse } from '../dto/info/info';
import { Node } from '../dto/my_data';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as fileSaver from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class AllDataService {

  constructor(private http: HttpClient, 
              private _snackBar: MatSnackBar) { }

  private infoAddressPrefixAllData: string = environmentCustom.address + '/api/all-data/info';
  private foldersAddressAllData: string = environmentCustom.address + "/api/all-data/folders";
  private baseUrlAllData = environmentCustom.address + '/api/all-data';



  getTypeList(): Observable<string[]> {
    return this.http.get<string[]>(environmentCustom.address + "/api/all-data/types")
  }

  // TODO users

  getSearchList(getSearchListRequest: GetSearchListRequest): Observable<GetSearchListResponse> {
    return this.http.post<GetSearchListResponse>(environmentCustom.address + "/api/all-data/search", getSearchListRequest);
  }

  getInfoOfUser(userName: string, infoName: string): Observable<GetInfoResponse> {
    let infoAddress: string = this.infoAddressPrefixAllData + '/' + userName + '/' + infoName;
    return this.http.get<GetInfoResponse>(infoAddress);
  }

  getPackageFolderStructureOfUser(userName: string, packageName: string): Observable<Node> {
    return this.http.get<Node>(this.foldersAddressAllData + "/" + userName + "/" + packageName);
  }

  downloadFileOfUser(userName: string, packageName: string, fileNameWithPath: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    let params = new HttpParams();
    params = params.append('userName', userName);
    params = params.append('packageName', packageName);
    params = params.append('fileNameWithPath', fileNameWithPath)
   
    this.openSnackBar("Buffering download","It might take up to a few minutes", 100000)

    this.http.get(this.baseUrlAllData + "/download/user", { 
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

  downloadFileOfUserSimple(userName: string, packageName: string, fileNameWithPath: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    let params = new HttpParams();
    params = params.append('userName', userName);
    params = params.append('packageName', packageName);
    params = params.append('fileNameWithPath', fileNameWithPath)
   
    this.openSnackBar("Buffering download","It might take up to a few minutes", 100000)

    return this.http.get(this.baseUrlAllData + "/download/user", { 
        reportProgress: true,
        observe: 'events',
        responseType: 'blob',
        headers: headers, 
        params: params 
      });
  }

  openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, {duration: duration});
  }
}
