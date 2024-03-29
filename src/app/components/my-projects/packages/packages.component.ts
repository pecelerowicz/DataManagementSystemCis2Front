import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AddMyInfoToOwnedProjectRequest } from '../../../dto/my_project';
import { MyProjectsService } from '../../../services/my-projects.service';
import { SharedCommunicationService } from '../../../services/shared-communication.service';
import { RemovePackageDialogComponent } from './dialogs/remove-package-dialog/remove-package-dialog.component';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'username', 'metadata', 'storage', 'delete'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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

  constructor(private route: ActivatedRoute,
              private myProjectsService: MyProjectsService,
              private dialog: MatDialog,
              private sharedCommunicationService: SharedCommunicationService,
              private _snackBar: MatSnackBar) { }

  public id: number = -1;
  public projectName: string = '';
  public infoList: string[] = [];

  getProjectDetails() {
    this.myProjectsService.getOwnedProject(this.id).subscribe(val => {
      this.projectName = val.name;
      this.dataSource.data = val.projectInfoResponseList;
    },
    err => {
      console.log(err);
    });
  }

  getMyInfos() {
    this.myProjectsService.getInfoList().subscribe(val => {
      this.infoList = val.infoNameList;
    },
    err => {
      console.log(err);
    });
  }

  onMetadata(val) {
    this.sharedCommunicationService.fromMyProjectsPackagesToPackagesInfo.next();
    this.sharedCommunicationService.fromMyProjectsPackagesToPackagesInfoData = 
      {projectId: this.id, infoName: val.name, userName: val.username};
  }

  onStorage(val) {
    this.sharedCommunicationService.fromMyProjectsPackagesToPackagesFolder.next();
    this.sharedCommunicationService.fromMyProjectsPackagesToPackagesFolderData = 
      {projectId: this.id, infoName: val.name, userName: val.username};
  }

  onOpenRemovePackageDialog(element) {
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
    this.myProjectsService.addMyInfoToOwnedProject(payload).subscribe(val => {
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
