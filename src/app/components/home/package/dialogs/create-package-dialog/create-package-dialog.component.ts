import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreatePackageRequest } from 'src/app/dto/my_data';
import { MyDataService } from 'src/app/services/my-data.service';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';
import { createNameValidator } from 'src/app/validators/field_validators/name.validator';

@Component({
  selector: 'app-create-package-dialog',
  templateUrl: './create-package-dialog.component.html',
  styleUrls: ['./create-package-dialog.component.css']
})
export class CreatePackageDialogComponent {

    constructor(
      private myDataService: MyDataService,
      private router: Router,
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
      this.myDataService.createPackage(createPackageRequest).subscribe(
        (val) => {
          this.sharedCommunicationService.updateListOfPackages$.next()
          this.openSnackBar(val.createPackageMessage, '');
          this.dialogRef.close();
          this.router.navigate(['/home']);
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
