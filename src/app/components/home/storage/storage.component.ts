import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SharedCommunicationService } from '../../../services/shared-communication.service';
import { StorageService } from '../../../services/storage.service';
import { Node } from '../../../dto/storage';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageListService } from '../../../services/storage-list.service';

export interface DialogData {
  order: number;
  name: string;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  folder: boolean;
}

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
})
export class StorageComponent implements OnInit {
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
              private storageService: StorageService,
              private sharedCommunicationService: SharedCommunicationService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.order = parseInt(params.get('order'));
      this.name = params.get('name');

      this.storageService.getStorage().subscribe((val) => {
          this.dataSource.data = val.children[this.order-1].children;
      });
    });

    this.sharedCommunicationService.updateListOfFolders$.subscribe(() => {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.order = parseInt(params.get('order'));
        this.name = params.get('name');
  
        this.storageService.getStorage().subscribe((val) => {
            this.dataSource.data = val.children[this.order-1].children;
        });
      });

    })
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  isEmptyFolder = (_: number, node: ExampleFlatNode) => node.folder && !node.expandable;

  onDownload(val) {
    console.log("download " + val);
  }

  onUpload(val) {
    this.sharedCommunicationService.passParam = {name: 'upload', path: val};
    this.sharedCommunicationService.componentChangeEmitter.emit();
  }

  onDelete(val) {
    console.log("delete " + val);
  }

  onOpenCreateNewFolderDialog() {
    console.log("--")
    console.log(this.name)
    console.log("--")
    this.dialog.open(CreateFolderDialog, {data: {order: this.order, name: this.name}});
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
  constructor(private storageListService: StorageListService,
              private dialogRef: MatDialogRef<CreateFolderDialog>,
              public sharedCommunicationService: SharedCommunicationService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  onCreate(dialogForm: NgForm) {
    this.storageListService.createFolder(dialogForm.value.name, 
      this.sharedCommunicationService.fromListToStorage.name).subscribe(
        (val) => {
          this.sharedCommunicationService.updateListOfFolders$.next();
          this.openSnackBar('Created Folder', val.newFolderFullName)
          this.dialogRef.close();
        },
        (err) => {
          this.openSnackBar("Could not create package!", err.error.exception);
        }
      );
    
    // this.storageListService.createPackage(dialogForm.value.name).subscribe(
    //   (val) => {
    //     this.sharedCommunicationService.updateListOfPackages$.next()
    //     this.openSnackBar('Created Package:', val.packageName);
    //     this.dialogRef.close();
    //   },
    //   (err) => {
    //     this.openSnackBar("Could not create package!", err.error.exception);
    //   }
    // );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 6000,
    });
  }
}

