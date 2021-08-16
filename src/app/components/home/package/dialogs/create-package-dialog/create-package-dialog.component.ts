import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreatePackageRequest } from 'src/app/dto/my_package';
import { PackageService } from 'src/app/services/package.service';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';
import { createNameValidator } from 'src/app/validators/field_validators/name.validator';

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
  
    packageName: FormControl = new FormControl('', 
      {validators: [createNameValidator()],
      updateOn: "change"});  

    form = new FormGroup({
      packageName: this.packageName
    })  

    onCreate() {
      let createPackageRequest: CreatePackageRequest = {packageName: this.form.value.packageName};
      this.packageService.createPackage(createPackageRequest).subscribe(
        (val) => {
          this.sharedCommunicationService.updateListOfPackages$.next()
          this.openSnackBar(val.createPackageMessage, '');
          this.dialogRef.close();
        },
        (err) => {
          this.openSnackBar("Could not create package", err.error.message);
        }
      );
    }

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {duration: 6000,});
    }
}
