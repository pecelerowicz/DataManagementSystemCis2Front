import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreatePackageRequest } from 'src/app/dto/my_package';
import { PackageService } from 'src/app/services/package.service';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';

@Component({
  selector: 'app-create-package-dialog',
  templateUrl: './create-package-dialog.component.html',
  styleUrls: ['./create-package-dialog.component.css']
})
export class CreatePackageDialogComponent {

    constructor(
      private packageService: PackageService,
      private dialogRef: MatDialogRef<CreatePackageDialogComponent>,
      private sharedCommunicationService: SharedCommunicationService,
      private _snackBar: MatSnackBar) {}
  
    onCreate(dialogForm: NgForm) {
      let createPackageRequest: CreatePackageRequest = {packageName: dialogForm.value.name};
      this.packageService.createPackage(createPackageRequest).subscribe(
        (val) => {
          this.sharedCommunicationService.updateListOfPackages$.next()
          this.openSnackBar(val.createPackageMessage, '');
          this.dialogRef.close();
        },
        (err) => {
          this.openSnackBar("Could not create package!", err.error.exception);
        }
      );
    }

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {duration: 6000,});
    }
}
