import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { DeleteItemRequest, Node } from '../../../dto/my_data';
import { TemFolderService } from 'src/app/services/tem-folder.service';
import { TemFolderStructure } from 'src/app/dto/my_tem';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MyDataService } from 'src/app/services/my-data.service';
import { DeleteFolderDialog, DialogData } from '../../home/folder/folder.component';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
 

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
    <button (click)="onDownloadFolder()" color="primary" mat-flat-button mat-dialog-close>Download</button>
    <button color="primary" mat-flat-button mat-dialog-close>Return</button>

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
export class DownloadTemDialog {
  public color: ThemePalette = 'primary';
  public mode: ProgressBarMode = 'determinate';
  public value = 50;
  public bufferValue = 75;
  
  constructor(private myDataService: MyDataService,
              private dialogRef: MatDialogRef<DeleteFolderDialog>,
              public sharedCommunicationService: SharedCommunicationService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  onDownloadFolder() {
    
    let deleteItemRequest: DeleteItemRequest = {packageName: this.data.name, itemPathString: this.data.subfolderName};
    
    
    // this.myDataService.deleteItem(deleteItemRequest).subscribe(
    //   val => {
    //     this.sharedCommunicationService.updateListOfFolders$.next();
    //     this.openSnackBar(val.deleteFolderMessage, '');
    //     this.dialogRef.close();
    //   }, 
    //   err => {
    //     this.openSnackBar("Could not delete package!", err.error.exception);
    //   }
    // )
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 6000,
    });
  }
}