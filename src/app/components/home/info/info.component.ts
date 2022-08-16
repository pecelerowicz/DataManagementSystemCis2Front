import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MyDataService } from '../../../services/my-data.service';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';
import { GetInfoResponse, UpdateInfoRequest } from 'src/app/dto/info/info';
import { createCreateDifrInfoRequest, getInitialValueDifr, mapDifrResponse, geometries, detectorAbsorbers, stages } from 'src/app/mappers/difr';
import { createCreateTestInfoRequest, getInitialValueTest, mapTestResponse } from 'src/app/mappers/test';
import { createUpdateInfoRequest, getInitialValueGeneral, mapGeneralResponse } from 'src/app/mappers/general';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  geometries = geometries;
  detectorAbsorbers = detectorAbsorbers;
  stages = stages;
  constructor(private route: ActivatedRoute, 
    private sharedCommunicationService: SharedCommunicationService, 
    private myDataService: MyDataService,
    private _snackBar: MatSnackBar,) {}

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
    this.infoState.order = parseInt(params.get('order'));
    this.infoState.infoName = this.sharedCommunicationService.fromListToMetadata.name;
    this.pullData();
    });
  } 

  giveUpChanges() {
    this.pullData();
  }

  updateChanges() {
    let updateInfoRequest: UpdateInfoRequest = createUpdateInfoRequest(this.infoState, this.general);

    if(this.infoState.isDifr) {
      updateInfoRequest.createDifrInfoRequest = createCreateDifrInfoRequest(this.infoState, this.difr);
    }
    if(this.infoState.isTest) {
      updateInfoRequest.createTestInfoRequest = createCreateTestInfoRequest(this.infoState, this.test);
    }

    this.myDataService.updateInfo(updateInfoRequest).subscribe(
      val => {
        // optymalnie byłoby przepisać zwracaną wartość...
        this.pullData();
        this.openSnackBar("Metadata updated", "");
      }, 
      err => {
        console.log(err);
        this.openSnackBar("Can not update metadata.", err.error.message);
      }
    )
  }

  pullData() {
    this.myDataService.getInfo(this.infoState.infoName).subscribe(
      val => {
        console.log(val);
        this.mapResponse(val);
      }, 
      err => {
        console.log(err);
      }
    )
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

  toggleIsFormDisabled(): void {
    this.infoState.isFormDisabled = !this.infoState.isFormDisabled;
  }

  addDiffractometer(): void {
    this.infoState.isDifr = true;
    this.infoState.hasMetadata = true;
    this.infoState.isFormDisabled = false;
    this.difr = getInitialValueDifr();
  }

  addTest(): void {
    this.infoState.isTest = true;
    this.infoState.hasMetadata = true;
    this.infoState.isFormDisabled = false;
    this.test = getInitialValueTest();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 6000,});
  }

}

export interface InfoState {
  order: number,
  infoName: string,
  isFormDisabled: boolean,
  hasMetadata: boolean,
  isDifr: boolean,
  isTest: boolean
}
