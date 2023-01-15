import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getInitialValueGeneral } from 'src/app/mappers/general';
import { MyDataService } from 'src/app/services/my-data.service';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';
import { DialogData } from '../../package.component';
import { CreatePackageRequest, RenamePackageRequest } from 'src/app/dto/my_data';
import { createNameValidator } from 'src/app/validators/field_validators/name.validator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rename-package-dialog',
  templateUrl: './rename-package-dialog.component.html',
  styleUrls: ['./rename-package-dialog.component.css']
})
export class RenamePackageDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    private sharedCommunicationService: SharedCommunicationService,
    private dialogRef: MatDialogRef<RenamePackageDialogComponent>,
    private myDataService: MyDataService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  oldName: string = "";
  
  ngOnInit(): void {
    this.oldName = this.form.value.packageName;
  }


    packageName: FormControl = new FormControl(this.data.name, 
    {validators: [createNameValidator()],
    updateOn: "change"});  

  form = new FormGroup({
    packageName: this.packageName
  })  

  onRename() {

    console.log(this.oldName);
    console.log(this.form.value.packageName);

    let renamePackageRequest: RenamePackageRequest = {packageOldName: this.oldName, packageNewName: this.form.value.packageName};
    this.myDataService.renamePackage(renamePackageRequest).subscribe(
      (val) => {
            this.sharedCommunicationService.updateListOfPackages$.next()
            this.openSnackBar(val.renamePackageMessage, '');
            this.dialogRef.close();
            this.router.navigate(['/home']);
          },
          (err) => {
            this.openSnackBar("Could not rename package", err.error.message);
          }
    );

    // let createPackageRequest: CreatePackageRequest = {packageName: this.form.value.packageName};
    // this.myDataService.createPackage(createPackageRequest).subscribe(
    //   (val) => {
    //     this.sharedCommunicationService.updateListOfPackages$.next()
    //     this.openSnackBar(val.createPackageMessage, '');
    //     this.dialogRef.close();
    //     this.router.navigate(['/home']);
    //   },
    //   (err) => {
    //     this.openSnackBar("Could not create package", err.error.message);
    //   }
    // );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 6000,});
  }

}
