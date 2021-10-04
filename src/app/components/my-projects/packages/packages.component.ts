import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GetInfoResponse } from '../../../dto/info/info';
import { AddMyInfoToOwnedProjectRequest, ProjectInfoResponse, RemoveInfoFromOwnedProjectRequest } from '../../../dto/my_project';
import { InfoService } from '../../../services/info.service';
import { ProjectService } from '../../../services/project.service';
import { SharedCommunicationService } from '../../../services/shared-communication.service';
import { RemovePackageDialogComponent } from './dialogs/remove-package-dialog/remove-package-dialog.component';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'author', 'metadata', 'storage', 'delete'];
  dataSource: ProjectInfoResponse[] = [];

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private infoService: InfoService,
              private dialog: MatDialog,
              private sharedCommunicationService: SharedCommunicationService,
              private _snackBar: MatSnackBar) { }

  public id: number = -1;
  public projectName: string = '';
  public infoList: string[] = [];

  ngOnInit(): void {
    this.sharedCommunicationService.updateListOfPackagesInProject$.subscribe(() => {
      this.getProjectDetails();
      this.getMyInfos();
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id'));
      this.getProjectDetails();
      this.getMyInfos();
    });
  }

  getProjectDetails() {
    this.projectService.getOwnedProject(this.id).subscribe(val => {
      this.projectName = val.name;
      this.dataSource = val.projectInfoResponseList;
    },
    err => {
      console.log(err);
    });
  }

  getMyInfos() {
    this.infoService.getInfoList().subscribe(val => {
      this.infoList = val.infoNameList;
    },
    err => {
      console.log(err);
    });
  }

  onMetadata(val) {
    console.log(val);
  }

  onStorage(val) {
    console.log(val);
  }

  onOpenRemovePackageDialog(element) {
    //console.log(element);
    this.dialog.open(RemovePackageDialogComponent, 
      {data: {infoName: element.name, 
              username: element.username,
              projectId: this.id}});
  }

  onAddMyInfo(val) {
    let payload: AddMyInfoToOwnedProjectRequest = {
      infoName: val,
      projectId: this.id
    }
    this.projectService.addMyInfoToOwnedProject(payload).subscribe(val => {
      this.getProjectDetails();
      this.getMyInfos();
      this._snackBar.open("Package was included in the project", "", {
        duration: 6000,
      });
    }, err => {
      this._snackBar.open("Package was not included", err.error.message, {
        duration: 6000,
      });
    })
  }

}
