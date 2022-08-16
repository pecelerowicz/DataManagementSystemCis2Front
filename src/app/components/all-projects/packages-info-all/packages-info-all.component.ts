import { Component, OnInit } from '@angular/core';
import { SharedCommunicationService } from '../../../services/shared-communication.service';
import { InfoState } from '../../home/info/info.component';
import { getInitialValueDifr, mapDifrResponse } from 'src/app/mappers/difr';
import { getInitialValueGeneral, mapGeneralResponse } from 'src/app/mappers/general';
import { getInitialValueTest, mapTestResponse } from 'src/app/mappers/test';
import { GetInfoResponse } from '../../../dto/info/info';
import { Location } from '@angular/common';
import { AllProjectsService } from 'src/app/services/all-projects.service';

@Component({
  selector: 'app-packages-info-all',
  templateUrl: './packages-info-all.component.html',
  styleUrls: ['./packages-info-all.component.css']
})
export class PackagesInfoAllComponent implements OnInit {

  constructor(private allProjectsService: AllProjectsService,
              private location: Location,
              private sharedCommunitationService: SharedCommunicationService) { }

  state: {projectId: number, infoName: string, userName: string} = {projectId: -1, infoName: '', userName: ''};
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
    this.state = this.sharedCommunitationService.fromAllProjectsPackagesToPackagesInfoData;
    this.infoState.infoName = this.state.infoName;
    this.infoState.order = -1; // I don't need it (?)
    this.pullData();
  }

  pullData() {
    console.log("-- -- --")
    console.log(this.state.projectId); 
    console.log(this.state.userName); 
    console.log(this.state.infoName);
    console.log("-- -- --")
    this.allProjectsService.getInfoOfUserAndProject(this.state.projectId, 
      this.state.userName, this.state.infoName).subscribe(val => {
        console.log(val);
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

  onGoBack() {
    this.location.back();
  }

}
