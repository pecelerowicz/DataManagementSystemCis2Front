import { HttpResponse } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
 
  param: {name: string, path: string, order: number};
  selectedFiles: FileList;
  progressInfos = [];
  message = '';

  uploadPressed: boolean = false;

  counterFiles: number = 0;
  totalFiles: number = this.progressInfos.length;
  counterErrors: number = 0;
  isComplete: boolean = this.counterFiles + this.counterErrors === this.totalFiles && this.totalFiles !== 0;

  fileInfos: Observable<any>;

  constructor(private sharedCommunicationService: SharedCommunicationService,
              private uploadService: UploadService) {
    this.param = this.sharedCommunicationService.passParam;
  }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    //this.message = '';
    this.uploadPressed = true;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  upload(idx, file) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    this.uploadService.upload(file, this.param.path).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.uploadService.getFiles();
          this.updateStatus();
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
        this.updateErrors();
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
