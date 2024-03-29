import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateInfoRequest } from 'src/app/dto/info/info';
import { getInitialValueGeneral } from 'src/app/mappers/general';
import { MyDataService } from 'src/app/services/my-data.service';
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
    private myDataService: MyDataService,
    private _snackBar: MatSnackBar) { }

  name: string = '';
  order: number = 0;

  ngOnInit(): void {
    this.name = this.data.name;
    this.order = this.data.order;
  }

  general: FormGroup = getInitialValueGeneral();

  onCreateMetadata() {
    let createInfoRequst: CreateInfoRequest = {
      infoName: this.name,
      access: this.general.value.access,
      title: this.general.value.title,
      shortDescription: this.general.value.shortDescription,
      description: this.general.value.description
    }
    this.myDataService.createInfo(createInfoRequst).subscribe(val => {
      this.sharedCommunicationService.updateListOfPackages$.next()
      this.sharedCommunicationService._createMetadataInDialogSource.next({ order: this.data.order, name: this.data.name});
      this.openSnackBar("Created metadata in package " + val.infoName, '');
    }, err => {
      console.log(err);
    });
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 6000,});
  }

}
