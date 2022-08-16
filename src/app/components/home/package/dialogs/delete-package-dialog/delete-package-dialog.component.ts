import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeletePackageRequest } from 'src/app/dto/my_data';
import { MyDataService } from 'src/app/services/my-data.service';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';
import { DialogData } from '../../package.component';

@Component({
  selector: 'app-delete-package-dialog',
  templateUrl: './delete-package-dialog.component.html',
  styleUrls: ['./delete-package-dialog.component.css']
})
export class DeletePackageDialogComponent {

  constructor(
    private myDataService: MyDataService,
    private dialogRef: MatDialogRef<DeletePackageDialogComponent>,
    private sharedCommunicationService: SharedCommunicationService,
    private _snackBar: MatSnackBar,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onDelete() {
      let deletePackageRequest: DeletePackageRequest = {packageName: this.data.name};
      this.myDataService.deletePackage(deletePackageRequest).subscribe((response) => {
        this.sharedCommunicationService.updateListOfPackages$.next()
        this.openSnackBar(response.deleteMessage, '');
        this.dialogRef.close();
        this.router.navigate(['/home']);
      },
      (err) => {
        this.openSnackBar("Could not delete package", err.error.message);
      })
    }

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {duration: 6000,});
    }
}
