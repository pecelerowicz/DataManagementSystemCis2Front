import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeletePackageRequest } from 'src/app/dto/my_data';
import { MyDataService } from 'src/app/services/my-data.service';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';
import { ArchivePackageRequest } from '../../../../../dto/my_data';
import { DialogData } from '../../package.component';

@Component({
  selector: 'app-archive-package-dialog',
  templateUrl: './archive-package-dialog.component.html',
  styleUrls: ['./archive-package-dialog.component.css']
})
export class ArchivePackageDialogComponent {

  constructor(
    private myDataService: MyDataService,
    private dialogRef: MatDialogRef<ArchivePackageDialogComponent>,
    private sharedCommunicationService: SharedCommunicationService,
    private _snackBar: MatSnackBar,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onArchive() {

      let archivePackageRequest: ArchivePackageRequest = {packageName: this.data.name};
      this.myDataService.archivePackage(archivePackageRequest).subscribe((response) => {
        this.sharedCommunicationService.updateListOfPackages$.next()
        this.openSnackBar(response.archivePackageMessage, '');
        this.dialogRef.close();
        this.router.navigate(['/home']);
      },
      (err) => {
        this.openSnackBar("Could not archive package", err.error.message);
      })
    }

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {duration: 6000,});
    }
}
