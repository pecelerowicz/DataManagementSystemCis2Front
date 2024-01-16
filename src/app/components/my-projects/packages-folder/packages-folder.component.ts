import { Component, Inject, OnInit } from '@angular/core';
import { MyProjectsService } from '../../../services/my-projects.service';
import { SharedCommunicationService } from '../../../services/shared-communication.service';
import { Node } from '../../../dto/my_data';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import * as fileSaver from 'file-saver';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface DialogDataDownload {
  projectId: number;
  userName: string;
  infoName: string;
  fileNameWithPath: string;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  folder: boolean;
}

@Component({
  selector: 'app-packages-folder',
  templateUrl: './packages-folder.component.html',
  styleUrls: ['./packages-folder.component.css']
})
export class PackagesFolderComponent implements OnInit {

  private _transformer = (node: Node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.relative,
      level: level,
      folder: node.folder
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private sharedCommunicationService: SharedCommunicationService,
              private myProjectsService: MyProjectsService,
              private location: Location,
              private dialog: MatDialog) { }

  state: {projectId: number, infoName: string, userName: string} = {projectId: -1, infoName: '', userName: ''};

  ngOnInit(): void {
    this.state = this.sharedCommunicationService.fromMyProjectsPackagesToPackagesFolderData
  
    this.myProjectsService.getPackageFolderStructureOfUserAndProject(
      this.state.projectId, this.state.userName, this.state.infoName
    ).subscribe(val => {
      console.log(val);
      this.dataSource.data = val.children;

    })
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  isEmptyFolder = (_: number, node: ExampleFlatNode) => node.folder && !node.expandable;

  onDownload(val) {
    this.dialog.open(DownloadDialogMyProject,  {data: {projectId: this.state.projectId,
                                                       userName: this.state.userName,
                                                       infoName: this.state.infoName, 
                                                       fileNameWithPath: val}, disableClose: true});
  }

  onGoBack() {
    this.location.back();
  }

}



@Component({
  selector: 'download-dialog-my-project',
  template: `
  <h1 mat-dialog-title>Download file: {{data.fileNameWithPath}} from {{data.infoName}}</h1>
    <div mat-dialog-actions align="center">

    <mat-progress-bar
        class="example-margin"
        [color]="color"
        [mode]="mode"
        [value]="value"
        [bufferValue]="bufferValue">
    </mat-progress-bar>
  </div>
  `,
  styles: [`
  .dialog-form {
    display: flex;
    flex-direction: column;
  }
  
  .example-form-field {
  width: 300px
  height: 350px;
}

.example-section {
  display: flex;
  align-content: center;
  align-items: center;
  height: 60px;
}

.mat-dialog-content {
  padding-bottom: 20px; /* Adjust the value as needed */
}

.example-margin {
  margin-top: 30px; /* Adjust the value as needed */
}
  `]
})
export class DownloadDialogMyProject implements OnInit {
  public color: ThemePalette = 'primary';
  public mode: ProgressBarMode = 'query';
  public value = 0;
  public bufferValue = 75;


  private firstDownloadEvent: boolean = true;
  
  constructor(private dialogRef: MatDialogRef<DownloadDialogMyProject>,
              public sharedCommunicationService: SharedCommunicationService,
              private myProjectsService: MyProjectsService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: DialogDataDownload) {}

  ngOnInit(): void {
    this.onDownloadFile();
  }

  onDownloadFile() {  
    this.myProjectsService.downloadFileOfProject(this.data.projectId, this.data.userName, this.data.infoName, this.data.fileNameWithPath)
    .subscribe(val => {
      if(val.type == HttpEventType.Response) {
        let contentDisposition = val.headers.get('content-disposition');
        let filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
        fileSaver.saveAs(new File([val.body], filename));
      
        this.openSnackBar("Download successful", "");
        setTimeout(() => {
          this.dialogRef.close();
        }, 2000);
      }

      if(val.type == HttpEventType.DownloadProgress) {
        if(this.firstDownloadEvent) {
          this.openSnackBar("Download started...", "");
          this.firstDownloadEvent = false;
        }
        this.mode = "determinate";
        this.value = Math.round(100 * val.loaded / val.total);
      }
    });
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 9000,
    });
  }
  
}
