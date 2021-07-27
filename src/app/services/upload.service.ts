import { Injectable, ɵSWITCH_CHANGE_DETECTOR_REF_FACTORY__POST_R3__ } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedCommunicationService } from './shared-communication.service';
import { UploadFileRequest } from '../dto/storage-list';
import { environmentCustom } from 'src/environments/environment.custom';
import * as fileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private baseUrl =  environmentCustom.address + '/api';   //'http://localhost:8080/api';

  constructor(private http: HttpClient,
              private sharedCommunicationService: SharedCommunicationService) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    let payload: UploadFileRequest = {
      packageName: this.sharedCommunicationService.passParam.packageName,
      folderRelativePath: this.sharedCommunicationService.passParam.folderPath
    }
    formData.append('file', file);
    formData.append('uploadFileRequest', JSON.stringify(payload));

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    })

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }

  download(packageName: string, fileNameWithPath: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    let params = new HttpParams();
    params = params.append('packageName', packageName);
    //params = params.append('folderPath', folderPath);
    params = params.append('fileNameWithPath', fileNameWithPath)
   
    this.http.get(this.baseUrl + "/download", { 
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
        }

      }
    );
  }

}
