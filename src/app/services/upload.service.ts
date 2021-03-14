import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedCommunicationService } from './shared-communication.service';
import { UploadFileRequest } from '../dto/storage-list';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private baseUrl = 'http://localhost:8080/api';

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
}
