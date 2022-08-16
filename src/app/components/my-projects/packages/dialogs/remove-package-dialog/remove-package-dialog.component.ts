import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RemoveInfoFromOwnedProjectRequest } from '../../../../../dto/my_project';
import { MyProjectsService } from '../../../../../services/my-projects.service';
import { SharedCommunicationService } from '../../../../../services/shared-communication.service';
import { DeletePackageDialogComponent } from '../../../../home/package/dialogs/delete-package-dialog/delete-package-dialog.component';

@Component({
  selector: 'app-remove-package-dialog',
  templateUrl: './remove-package-dialog.component.html',
  styleUrls: ['./remove-package-dialog.component.css']
})
export class RemovePackageDialogComponent implements OnInit {

  constructor(private myProjectsService: MyProjectsService,
    private dialogRef: MatDialogRef<DeletePackageDialogComponent>,
    private sharedCommunicationService: SharedCommunicationService,
    private _snackBar: MatSnackBar,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: RemovePackageDialogData) { }

  ngOnInit(): void {
  }

  onRemoveInfo() {
    let payload: RemoveInfoFromOwnedProjectRequest = {
      projectId: this.data.projectId,
      username: this.data.username,
      infoName: this.data.infoName
    }
    this.myProjectsService.removeInfoFromOwnedProject(payload).subscribe(val => {
      this._snackBar.open("Package was removed from the project", "", {
        duration: 6000,
      });
      this.dialogRef.close();
      this.sharedCommunicationService.updateListOfPackagesInProject$.next()
      //this.router.navigate(['/my-projects']);
    }, err => {
      this._snackBar.open("Package was not removed", err.error.message, {
        duration: 6000,
      });
    })
  }

}

export interface RemovePackageDialogData {
  infoName: string;
  username: string;
  projectId: number;
}
