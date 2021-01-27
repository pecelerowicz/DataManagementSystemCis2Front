import { Component, OnInit } from '@angular/core';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
 
  param: {name: string, path: string};

  constructor(private sharedCommunicationService: SharedCommunicationService) {
    this.param = sharedCommunicationService.passParam;
  }

  ngOnInit(): void {
  }

}
