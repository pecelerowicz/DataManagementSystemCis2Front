import { HttpResponse } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyDataService } from 'src/app/services/my-data.service';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
 
  param: {name: string, path: string, order: number, packageName: string, folderPath: string};
  selectedFiles: FileList;
  progressInfos = [];
  message = '';

  uploadPressed: boolean = false;

  counterFiles: number = 0;
  totalFiles: number = this.progressInfos.length;
  counterErrors: number = 0;
  isComplete: boolean = this.counterFiles + this.counterErrors === this.totalFiles && this.totalFiles !== 0;

  constructor(private sharedCommunicationService: SharedCommunicationService,
              private myDataService: MyDataService, 
              private _snackBar: MatSnackBar) {
    this.param = this.sharedCommunicationService.passParam;
  }

  ngOnInit(): void {
  }

  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    this.uploadPressed = true;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  upload(idx, file) {
    this.progressInfos[idx] = { value: 0, fileName: file.name, mode: "determinate" };
  
    this.myDataService.uploadFile(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          if(event.loaded === event.total) {
            this.progressInfos[idx].mode = "query";
            this._snackBar.open("Saving", "", {duration: 12000});
            
          }
        } else if(event.type === HttpEventType.Sent) {
          this._snackBar.open("Sending...", '', {duration: 12000});
        } else if (event instanceof HttpResponse) {
          this.updateStatus();
          this._snackBar.open("File saved", '', {duration: 6000});
          this.progressInfos[idx].mode = "determinate";
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.progressInfos[idx].mode = "determinate";
        this.message = 'Could not upload the file:' + file.name;
        this.updateErrors();

        this._snackBar.open("Could not upload the file", err.error.message, {
          duration: 6000,
        });
      });
  }

  updateStatus() {
    this.counterFiles++;
    this.totalFiles = this.progressInfos.length;
    this.isComplete = this.counterFiles + this.counterErrors === this.totalFiles && this.totalFiles !== 0;
  }

  updateErrors() {
    this.counterErrors++;
    this.totalFiles = this.progressInfos.length;
    this.isComplete = this.counterFiles + this.counterErrors === this.totalFiles && this.totalFiles !== 0;
  }

  onGoBack() {
    this.sharedCommunicationService.uploadBackEmitter.emit();
  }

}
