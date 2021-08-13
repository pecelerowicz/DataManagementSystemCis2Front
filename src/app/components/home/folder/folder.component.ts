import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Data, ParamMap } from '@angular/router';
import { SharedCommunicationService } from '../../../services/shared-communication.service';
import { FolderService } from '../../../services/folder.service';
import { Node } from '../../../dto/storage';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadService } from 'src/app/services/upload.service';
import { DeleteItemRequest } from 'src/app/dto/my_folder';

export interface DialogData {
  order: number;
  name: string;
  subfolderName: string;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  folder: boolean;
}

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css'],
})
export class FolderComponent implements OnInit {
  order: number;
  name: string;

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

  constructor(private route: ActivatedRoute, 
              private folderService: FolderService,
              private uploadService: UploadService,
              private sharedCommunicationService: SharedCommunicationService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.order = parseInt(params.get('order'));
      this.name = this.sharedCommunicationService.fromListToStorage.name;
      this.folderService.getPackageFolderStructure(this.name).subscribe((val) => {
        this.dataSource.data = val.children;
      })
    });

    this.sharedCommunicationService.updateListOfFolders$.subscribe(() => {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.order = parseInt(params.get('order'));
        this.name = this.sharedCommunicationService.fromListToStorage.name;
        this.folderService.getPackageFolderStructure(this.name).subscribe((val) => {
          this.dataSource.data = val.children;
        })
      });

    })
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  isEmptyFolder = (_: number, node: ExampleFlatNode) => node.folder && !node.expandable;

  onDownload(val) {
    this.uploadService.download(this.name, val);
  }

  onUpload(val) {
    this.sharedCommunicationService.passParam = {name: 'upload', path: val, order: this.order, packageName: this.name, folderPath: val};
    this.sharedCommunicationService.componentChangeEmitter.emit();
  }

  onOpenCreateNewFolderDialog() {
    this.dialog.open(CreateFolderDialog, {data: {order: this.order, name: this.name, subfolderName: ""}});
  }

  onOpenCreateSubfolderDialog(val: string) {
    this.dialog.open(CreateFolderDialog, {data: {name: this.name, subfolderName: val}})
  }

  onOpenDeleteFolderDialog(val: string) {
    this.dialog.open(DeleteFolderDialog, {data: {name: this.name, subfolderName: val}})
  }
}

@Component({
  selector: 'create-folder-dialog',
  template: `
        <form #dialogForm="ngForm" class="dialog-form">
          <mat-form-field class="example-form-field">
            <input ngModel matInput type="text" name="name" placeholder="Folder Name">
          </mat-form-field>
          <button (click)="onCreate(dialogForm)"
                  mat-raised-button color="primary">
            Create {{data.order}} {{this.sharedCommunicationService.fromListToStorage.name}}
          </button>
        </form>
  `,
  styles: [`
  .dialog-form {
    display: flex;
    flex-direction: column;
  }
  
  .example-form-field {
  width: 300px
  height: 250px;
}
  `]
})
export class CreateFolderDialog {
  constructor(private folderService: FolderService,
              private dialogRef: MatDialogRef<CreateFolderDialog>,
              public sharedCommunicationService: SharedCommunicationService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  onCreate(dialogForm: NgForm) {

    let packageName = this.data.name;
    let sourceName = this.data.subfolderName;
    let newFolder = dialogForm.value.name;

    this.folderService.createFolder(newFolder, sourceName, packageName).subscribe(
        (val) => {
          this.sharedCommunicationService.updateListOfFolders$.next();
          this.openSnackBar('Created Folder', val.newFolderFullName)
          this.dialogRef.close();
        },
        (err) => {
          this.openSnackBar("Could not create package!", err.error.exception);
        }
      );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 6000,
    });
  }
}

@Component({
  selector: 'delete-folder-dialog',
  template: `
  <h1 mat-dialog-title>Are you sure you want to delete the folder and its content?</h1>
    <div mat-dialog-actions align="center">
    <button (click)="onDelete()" color="warn" mat-flat-button mat-dialog-close>Delete</button>
  </div>

  `,
  styles: [`
  .dialog-form {
    display: flex;
    flex-direction: column;
  }
  
  .example-form-field {
  width: 300px
  height: 250px;
}
  `]
})
export class DeleteFolderDialog {
  constructor(private folderService: FolderService,
              private dialogRef: MatDialogRef<DeleteFolderDialog>,
              public sharedCommunicationService: SharedCommunicationService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  onDelete() {
    
    let deleteItemRequest: DeleteItemRequest = {packageName: this.data.name, itemPathString: this.data.subfolderName};
    
    this.folderService.deleteFolder(deleteItemRequest).subscribe(
      val => {
        this.sharedCommunicationService.updateListOfFolders$.next();
        this.openSnackBar(val.deleteFolderMessage, '');
        this.dialogRef.close();
      }, 
      err => {
        this.openSnackBar("Could not delete package!", err.error.exception);
      }
    )
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 6000,
    });
  }
}
