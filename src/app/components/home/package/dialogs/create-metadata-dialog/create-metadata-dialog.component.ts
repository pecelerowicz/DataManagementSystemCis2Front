import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Access, CreateInfoRequest } from 'src/app/dto/info/info';
import { getInitialValueGeneral } from 'src/app/mappers/general';
import { InfoService } from 'src/app/services/info.service';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';
import { DialogData } from '../../package.component';

@Component({
  selector: 'app-create-metadata-dialog',
  templateUrl: './create-metadata-dialog.component.html',
  styleUrls: ['./create-metadata-dialog.component.css']
})
export class CreateMetadataDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    private sharedCommunicationService: SharedCommunicationService,
    private dialogRef: MatDialogRef<CreateMetadataDialogComponent>,
    private infoService: InfoService, 
    private _snackBar: MatSnackBar) { }

  name: string = '';

  ngOnInit(): void {
    this.name = this.data.name;
  }

  general: FormGroup = getInitialValueGeneral();

  onCreateMetadata() {
    let createInfoRequst: CreateInfoRequest = {
      infoName: this.name,
      access: this.general.value.access,
      shortName: this.general.value.shortName,
      longName: this.general.value.longName,
      description: this.general.value.description
    }
    this.infoService.createMetadata(createInfoRequst).subscribe(val => {
      this.sharedCommunicationService.updateListOfPackages$.next()
      this.openSnackBar("Created metadata in package " + val.infoName, '');
      this.dialogRef.close();
    }, err => {
      console.log(err);
    })


  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 6000,});
  }

}
