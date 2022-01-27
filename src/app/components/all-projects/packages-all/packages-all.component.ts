import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AddMyInfoToOtherProjectRequest, ProjectInfoResponse, RemoveMyInfoFromOtherProjectRequest } from '../../../dto/my_project';
import { AuthService } from '../../../services/auth.service';
import { InfoService } from '../../../services/info.service';
import { ProjectService } from '../../../services/project.service';
import { SharedCommunicationService } from '../../../services/shared-communication.service';

@Component({
  selector: 'app-packages-all',
  templateUrl: './packages-all.component.html',
  styleUrls: ['./packages-all.component.css']
})
export class PackagesAllComponent implements AfterViewInit {

  displayedColumns: string[] = ['name', 'username', 'metadata', 'storage', 'delete'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private infoService: InfoService,
              private authService: AuthService,
              private sharedCommunicationService: SharedCommunicationService,
              private _snackBar: MatSnackBar) { }

  public id: number = -1;
  public projectName: string = '';
  public infoList: string[] = [];
  public userName: string = '';

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id'));
      this.getProjectDetails();
      this.getMyInfos();
      this.userName = this.authService.getUserName();
    });
  }

  getProjectDetails() {
    this.projectService.getProject(this.id).subscribe(val => {
      this.projectName = val.name;
      this.dataSource.data = val.projectInfoResponseList;
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

  onAddMyInfo(val) {
    let payload: AddMyInfoToOtherProjectRequest = {
      infoName: val,
      projectId: this.id
    }
    this.projectService.addMyInfoToOtherProject(payload).subscribe(val => {
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

  onRemoveMyInfo(val) {
    let payload: RemoveMyInfoFromOtherProjectRequest = {
      infoName: val.name,
      projectId: this.id
    }

    this.projectService.removeMyInfoFromOtherProject(payload).subscribe(val => {
      this.getProjectDetails();
      this.getMyInfos();
      this._snackBar.open("Package was removed from the project", "", {
        duration: 6000,
        });
      }, err => {
        this._snackBar.open("Package was not removed", err.error.message, {
          duration: 6000,
        });
      })


    console.log(val);
  }

  onMetadata(val) {
    console.log(val);
    
    this.sharedCommunicationService.fromAllProjectsPackagesToPackagesInfo.next();
    this.sharedCommunicationService.fromAllProjectsPackagesToPackagesInfoData = 
      {projectId: this.id, infoName: val.name, userName: val.username};
  }

  onStorage(val) {
    console.log(val);

    this.sharedCommunicationService.fromAllProjectsPackagesToPackagesFolder.next();
    this.sharedCommunicationService.fromAllProjectsPackagesToPackagesFolderData = 
      {projectId: this.id, infoName: val.name, userName: val.username};
  }

}
