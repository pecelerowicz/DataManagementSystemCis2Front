import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateFolderRequest, CreateFolderResponse, CreatePackageRequest, CreatePackageResponse, CreateStorageRequest, CreateStorageResponse, DeleteItemRequest, DeleteItemResponse, DeletePackageRequest, DeletePackageResponse, GetPackageListResponse, UploadFileRequest } from '../dto/my_data';
import { environmentCustom } from 'src/environments/environment.custom';
import { CreateInfoRequest, CreateInfoResponse, GetInfoResponse, UpdateInfoRequest, UpdateInfoResponse } from '../dto/info/info'
import { Node } from '../dto/my_data';
import { SharedCommunicationService } from './shared-communication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as fileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class MyDataService {

  constructor(private http: HttpClient,
              private sharedCommunicationService: SharedCommunicationService,
              private _snackBar: MatSnackBar) { }

  private packageAddressMyData: string = environmentCustom.address + "/api/my-data/package";
  private infoAddressPrefixMyData: string = environmentCustom.address + '/api/my-data/info';
  private storageAddress: string = environmentCustom.address + '/api/my-data/storage';
  private foldersAddressMyData: string = environmentCustom.address + "/api/my-data/folders";
  private baseUrlMyData = environmentCustom.address + '/api/my-data';

  getPackageList(): Observable<GetPackageListResponse> {
    return this.http.get<GetPackageListResponse>(this.packageAddressMyData);
  }

  createPackage(createPackageRequest: CreatePackageRequest): Observable<CreatePackageResponse> {
    return this.http.post<CreatePackageResponse>(this.packageAddressMyData, createPackageRequest);
  }

  deletePackage(deletePackageRequest: DeletePackageRequest): Observable<DeletePackageResponse> {
    return this.http.request<DeletePackageResponse>('delete', this.packageAddressMyData, {body: deletePackageRequest});
  }

  getInfo(infoName: string): Observable<GetInfoResponse> {
    let infoAddress: string = this.infoAddressPrefixMyData + '/' + infoName;
    return this.http.get<GetInfoResponse>(infoAddress);
  }

  createInfo(createInfoRequest: CreateInfoRequest): Observable<CreateInfoResponse> {
    let infoAddress: string = this.infoAddressPrefixMyData;
    return this.http.post<CreateInfoResponse>(infoAddress, createInfoRequest);
  }

  updateInfo(updateInfoRequest: UpdateInfoRequest): Observable<UpdateInfoResponse> {
    let infoAddress: string = this.infoAddressPrefixMyData;
    return this.http.put<UpdateInfoResponse>(infoAddress, updateInfoRequest);
  }

  createStorage(createStorageRequest: CreateStorageRequest): Observable<CreateStorageResponse> {
    return this.http.post<CreateStorageResponse>(this.storageAddress, createStorageRequest);
  }

  getPackageFolderStructure(packageName: string): Observable<Node> {
    return this.http.get<Node>(this.foldersAddressMyData + "/" + packageName);
  }

  createFolder(newFolderName: string, parentFolderRelativePath: string, packageName: string): Observable<CreateFolderResponse> {
    let payload: CreateFolderRequest = 
      {newFolderName: newFolderName, packageName: packageName, 
        parentFolderRelativePath: parentFolderRelativePath};
    return this.http.post<CreateFolderResponse>(this.foldersAddressMyData, payload);
  }

  deleteItem(deleteItemRequest: DeleteItemRequest): Observable<DeleteItemResponse> {
    return this.http.request<DeleteItemResponse>('delete', this.foldersAddressMyData, {body: deleteItemRequest});
  }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    let payload: UploadFileRequest = {
      packageName: this.sharedCommunicationService.passParam.packageName,
      folderRelativePath: this.sharedCommunicationService.passParam.folderPath
    }
    formData.append('file', file);
    formData.append('uploadFileRequest', JSON.stringify(payload));

    const req = new HttpRequest('POST', `${this.baseUrlMyData}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    })

    return this.http.request(req);
  }

  downloadFile(packageName: string, fileNameWithPath: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    let params = new HttpParams();
    params = params.append('packageName', packageName);
    //params = params.append('folderPath', folderPath);
    params = params.append('fileNameWithPath', fileNameWithPath)
   
    this.openSnackBar("Buffering download","It might take up to a few minutes", 100000)

    this.http.get(this.baseUrlMyData + "/download", { 
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
