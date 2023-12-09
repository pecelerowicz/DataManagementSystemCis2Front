import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environmentCustom } from 'src/environments/environment.custom';
import { TemFolderStructure } from '../dto/my_tem';
import * as fileSaver from 'file-saver';


@Injectable({
    providedIn: 'root'
})
export class TemFolderService {
    constructor(private http: HttpClient, 
                private _snackBar: MatSnackBar) { }

    private addressTemMainFolder: string = environmentCustom.address + '/api/tem/main-folder';
    private addressTemDownloadFile: string = environmentCustom.address + '/api/tem/download-file';
    private addressTemDownloadZipFolder: string = environmentCustom.address + '/api/tem/download-zip-folder'
    private addressTemGrantAccess: string = environmentCustom.address + '/api/tem/grant-access';    

    
    getTemMainFolder(): Observable<TemFolderStructure> {
        return this.http.get<TemFolderStructure>(this.addressTemMainFolder);
    }

    downloadFile(fileNameWithPath: string) {
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/pdf');
        let params = new HttpParams();
        params = params.append('fileNameWithPath', fileNameWithPath)
       
        this.openSnackBar("Buffering download","It might take up to a few minutes", 100000)
    
        this.http.get(this.addressTemDownloadFile, { 
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

    downloadZipFolder(folderNameWithPath: string) {
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/pdf');
        let params = new HttpParams();
        params = params.append('folderNameWithPath', folderNameWithPath);

        console.log("----")
        console.log(folderNameWithPath)
        console.log("----")

        return this.http.get(this.addressTemDownloadZipFolder, {
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