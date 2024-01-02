import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AllDataService } from 'src/app/services/all-data.service';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';
import { Node } from '../../../dto/my_data';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DownloadDialog } from '../../home/folder/folder.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyDataService } from 'src/app/services/my-data.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { HttpEventType } from '@angular/common/http';
import * as fileSaver from 'file-saver';



export interface DialogDataSearch {
  userName: string;
  packageName: string;
  subfolderName: string;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  folder: boolean;
}

@Component({
  selector: 'app-search-folder',
  templateUrl: './search-folder.component.html',
  styleUrls: ['./search-folder.component.css']
})
export class SearchFolderComponent implements OnInit {

  order: number;
  packageName: string;
  userName: string;
  subfolderName: string;

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
              private allDataService: AllDataService,
              private route: ActivatedRoute, 
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.order = this.sharedCommunicationService.fromSearchToStorage.position;
      this.packageName = this.sharedCommunicationService.fromSearchToStorage.name;
      this.userName = this.sharedCommunicationService.fromSearchToStorage.username;
      this.allDataService.getPackageFolderStructureOfUser(this.userName, this.packageName).subscribe((val) => {
        this.dataSource.data = val.children;
      })
    });

  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  isEmptyFolder = (_: number, node: ExampleFlatNode) => node.folder && !node.expandable;

  onDownload(val: string) {
    console.log(val);
  }

  onDownloadFileOfUser(val) {
    // this.allDataService.downloadFileOfUser(this.username, this.name, val)
    this.dialog.open(DownloadSearchDialog, {data: {packageName: this.packageName, 
                                                   userName: this.userName, 
                                                   subfolderName: val}, disableClose: true});
  }

  onTestDisplay() {
    console.log(this.sharedCommunicationService.fromSearchToStorage);
  }

}


@Component({
  selector: 'download-search-dialog',
  template: `
  <h1 mat-dialog-title>Download file: {{data.packageName}} {{data.subfolderName}}</h1>
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
export class DownloadSearchDialog implements OnInit {
  public color: ThemePalette = 'primary';
  public mode: ProgressBarMode = 'query';
  public value = 0;
  public bufferValue = 75;


  private firstDownloadEvent: boolean = true;
  
  constructor(private dialogRef: MatDialogRef<DownloadDialog>,
              public sharedCommunicationService: SharedCommunicationService,
              private _snackBar: MatSnackBar,
              private myDataService: MyDataService,
              private allDataService: AllDataService,
              @Inject(MAT_DIALOG_DATA) public data: DialogDataSearch) {}

  ngOnInit(): void {
    this.onDownloadFile();
  }

  onDownloadFile() {  
    this.allDataService.downloadFileOfUserSimple(this.data.userName, this.data.packageName, 
                                                 this.data.subfolderName)
    .subscribe(
      val => {
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
      }
  )
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 9000,
    });
  }
  
}
