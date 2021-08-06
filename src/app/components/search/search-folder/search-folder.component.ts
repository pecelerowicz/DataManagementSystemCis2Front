import { Component, OnInit } from '@angular/core';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';

@Component({
  selector: 'app-search-folder',
  templateUrl: './search-folder.component.html',
  styleUrls: ['./search-folder.component.css']
})
export class SearchFolderComponent implements OnInit {

  constructor(private sharedCommunicationService: SharedCommunicationService) { }

  ngOnInit(): void {
  }

  onTestDisplay() {
    console.log(this.sharedCommunicationService.fromSearchToStorage);
  }

}
