import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyProjectsService } from '../../../../../services/my-projects.service';
import { DeleteOwnedProjectRequest } from '../../../../../dto/my_project';
import { SharedCommunicationService } from '../../../../../services/shared-communication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-delete-project-dialog',
  templateUrl: './delete-project-dialog.component.html',
  styleUrls: ['./delete-project-dialog.component.css']
})
export class DeleteProjectDialogComponent {

  constructor(private myProjectsService: MyProjectsService,
              private sharedCommunicationService: SharedCommunicationService,
              private router: Router,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: DialogDataDeleteProject) { }

  onDelete() {
    let deleteOwnedProjectRequest: DeleteOwnedProjectRequest = {
      projectId: this.data.id
    }
    this.myProjectsService.deleteOwnedProject(deleteOwnedProjectRequest).subscribe(val => {
      this.sharedCommunicationService.updateListOfProjects$.next()
      this.router.navigate(['/my-projects']);
      this.openSnackBar("Project deleted", '');
    }, err => {
      this.openSnackBar("Project not deleted", err.error.message);
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 6000,});
  }

}

export interface DialogDataDeleteProject {
  id: number;
}
