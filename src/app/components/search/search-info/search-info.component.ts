import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GetInfoResponse } from 'src/app/dto/info/info';
import { getInitialValueDifr, mapDifrResponse } from 'src/app/mappers/difr';
import { getInitialValueGeneral, mapGeneralResponse } from 'src/app/mappers/general';
import { getInitialValueTest, mapTestResponse } from 'src/app/mappers/test';
import { AllDataService } from 'src/app/services/all-data.service';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';
import { InfoState } from '../../home/info/info.component';

@Component({
  selector: 'app-search-info',
  templateUrl: './search-info.component.html',
  styleUrls: ['./search-info.component.css']
})
export class SearchInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private sharedCommunicationService: SharedCommunicationService,
              private allDataService: AllDataService) { }

  userName: string = '';
  infoState: InfoState = {
    order: 0,
    infoName: '',
    isFormDisabled: true,
    hasMetadata: false,
    isDifr: false,
    isTest: false
  }
            
  general = getInitialValueGeneral();            
  difr = getInitialValueDifr();
  test = getInitialValueTest();  

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userName = this.sharedCommunicationService.fromSearchToMetadata.username;
      this.infoState.infoName = this.sharedCommunicationService.fromSearchToMetadata.name;
      this.infoState.order = this.sharedCommunicationService.fromSearchToMetadata.position;
      this.pullData();
    });

  }

  pullData() {
    this.allDataService.getInfoOfUser(this.userName, this.infoState.infoName).subscribe(val => {
      //console.log(val);
      this.mapResponse(val);
    }, err => {
      console.log(err);
    })
  }

  mapResponse(getInfoResponse: GetInfoResponse) {
    mapGeneralResponse(this.general, getInfoResponse)
    this.resetInfoState();
    if(getInfoResponse.getDifrInfoResponse != null) {
      mapDifrResponse(this.infoState, this.difr, getInfoResponse.getDifrInfoResponse);
    }
    if(getInfoResponse.getTestInfoResponse != null) {
      mapTestResponse(this.infoState, this.test, getInfoResponse.getTestInfoResponse);
    }
  }

  resetInfoState() {
    this.infoState.isFormDisabled = true;
    this.infoState.hasMetadata = false;
    this.infoState.isDifr = false;
    this.infoState.isTest = false ; 
    this.infoState.isDifr = false;
    this.infoState.isTest = false;
  }

}
