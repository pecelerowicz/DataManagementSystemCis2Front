import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { getInitialValueCreateProject } from '../../../../../mappers/project/project';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../../../home/package/package.component';
import { CreateProjectRequest } from '../../../../../dto/my_project';
import { MyProjectsService } from '../../../../../services/my-projects.service';
import { SharedCommunicationService } from '../../../../../services/shared-communication.service';
import { CreateMetadataDialogComponent } from '../../../../home/package/dialogs/create-metadata-dialog/create-metadata-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.css']
})
export class CreateProjectDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private sharedCommunicationService: SharedCommunicationService,
              private dialogRef: MatDialogRef<CreateMetadataDialogComponent>,            
              private router: Router,
              private _snackBar: MatSnackBar,
              private myProjectsService: MyProjectsService) { }

  ngOnInit(): void {
  }

  project: FormGroup = getInitialValueCreateProject();

  onCreateProject() {
    let createProjectRequest: CreateProjectRequest = {
      projectName: this.project.value.projectName,
      description: this.project.value.description
    }
    this.myProjectsService.createOwnedProject(createProjectRequest).subscribe(val => {
      this.sharedCommunicationService._createProjectSource.next(createProjectRequest);
      this.openSnackBar('New project created', '');
      this.router.navigate(['/my-projects']);
      this.dialogRef.close();
    },
    err => {
      this.openSnackBar("Could not create a new project", err.error.message);
      this.dialogRef.close();
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 6000,});
  }

}
