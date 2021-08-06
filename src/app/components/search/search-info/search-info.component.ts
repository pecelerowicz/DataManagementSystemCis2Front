import { Component, OnInit } from '@angular/core';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';

@Component({
  selector: 'app-search-info',
  templateUrl: './search-info.component.html',
  styleUrls: ['./search-info.component.css']
})
export class SearchInfoComponent implements OnInit {

  constructor(private sharedCommunicationService: SharedCommunicationService) { }

  ngOnInit(): void {
    // console.log(this.sharedCommunicationService.fromSearchToMetadata);
  }

  onTestDisplay() {
    console.log(this.sharedCommunicationService.fromSearchToMetadata);
  }

}
