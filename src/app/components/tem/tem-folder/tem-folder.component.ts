import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Node } from '../../../dto/my_data';
import { TemFolderService } from 'src/app/services/tem-folder.service';
import { TemFolderStructure } from 'src/app/dto/my_tem';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../home/folder/folder.component';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { HttpEventType } from '@angular/common/http';
import * as fileSaver from 'file-saver';

interface TreeNode {
  expandable: boolean;
  name: string;
  level: number;
  folder: boolean;
}

@Component({
  selector: 'app-tem-folder',
  templateUrl: './tem-folder.component.html',
  styleUrls: ['./tem-folder.component.css']
})
export class TemFolderComponent implements OnInit {

  name: String = "test";

  TEM_FOLDER_STRUCTURE: TemFolderStructure = {
    folderStructure: null, 
    canRead: true, 
    canDownload: true, 
    canModifyContent: true, 
    canModifyAuthorities: true
  };

  // TREE API
  treeControl = new FlatTreeControl<TreeNode>((node) => node.level, (node) => node.expandable);
  
  private _transformer = (node: Node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.relative,
      level: level,
      folder: node.folder
    };
  };
  
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  // END OF TREE API

  hasChild = (_: number, node: TreeNode) => node.expandable;

  isEmptyFolder = (_: number, node: TreeNode) => node.folder && !node.expandable;

  constructor(private temFolderService: TemFolderService, private dialog: MatDialog) {
    this.dataSource.data = [];
  }

  ngOnInit(): void {
      this.temFolderService.getTemMainFolder().subscribe((val) => {
      this.TEM_FOLDER_STRUCTURE = val;
      this.dataSource.data = this.TEM_FOLDER_STRUCTURE.folderStructure.children;
    });
  }

  onDownloadFile(val) {
    this.temFolderService.downloadFile(val);
  }

  onOpenDownloadeTemDialog(val: string) {
    this.dialog.open(DownloadTemDialog, {data: {name: this.name, subfolderName: val}, disableClose: true})
  }
  
}


@Component({
  selector: 'download-tem-dialog',
  template: `
  <h1 mat-dialog-title>Download folder: {{data.name}} {{data.subfolderName}}</h1>
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
export class DownloadTemDialog implements OnInit {
  public color: ThemePalette = 'primary';
  public mode: ProgressBarMode = 'query';
  public value = 0;
  public bufferValue = 75;

  private firstDownloadEvent: boolean = true;
  
  constructor(private dialogRef: MatDialogRef<DownloadTemDialog>,
              public sharedCommunicationService: SharedCommunicationService,
              private _snackBar: MatSnackBar,
              private temFolderService: TemFolderService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this.onDownloadFolder();
  }

  onDownloadFolder() {  
    this.openSnackBar("Processing...", "");

    this.temFolderService.downloadZipFolder(this.data.subfolderName)
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