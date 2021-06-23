import { Component, OnInit, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PackageService } from '../../../services/package.service';
import { SharedCommunicationService } from '../../../services/shared-communication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DeletePackageRequest } from 'src/app/dto/my_package';
import { StorageService } from 'src/app/services/storage.service';
import { CreateStorageRequest } from 'src/app/dto/my_storage';
import { InfoService } from 'src/app/services/info.service';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css'],
})
export class PackageComponent implements OnInit {
  @Output() info = new EventEmitter<{ order: number }>();
  @Output() storage = new EventEmitter<{ order: number }>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<{name: string, position: number}>;

  constructor(private infoService: InfoService,
              private storageService: StorageService,
              private packageService: PackageService,
              private sharedCommunicationService: SharedCommunicationService,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }  

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getPackageList();
    this.sharedCommunicationService.updateListOfPackages$.subscribe(() => {
      this.getPackageList();
    })
  }

  private getPackageList() {
    let fetch: {name: string, hasStorage: boolean, hasMetadata: boolean, position: number}[] = [];
    this.packageService.getPackageList().subscribe(val => {
      let counter: number = 1;
      for(let sm of val.packageResponseList) {
        fetch.push({name: sm.name, hasStorage: sm.hasStorage, 
          hasMetadata: sm.hasMetadata, position: counter});
        counter++;
      }
      this.dataSource.data = fetch;
    })
  }

  onInfo(element) {
    this.info.emit({ order: element.position });
    this.sharedCommunicationService.fromListToMetadata.name = element.name;
  }

  onStorage(element) {
    this.storage.emit({ order: element.position });
    this.sharedCommunicationService.fromListToStorage.name = element.name;
  }

  onCreateStorage(element) {
    this.storageService.createStorage(element.name).subscribe(
      (val) => {
        this.sharedCommunicationService.updateListOfPackages$.next();
        this._snackBar.open("Storage created:" , element.name, {
          duration: 6000,
        });

        this.storage.emit({ order: element.position });
        this.sharedCommunicationService.fromListToStorage.name = element.name;
      },
      (err) => {
        this._snackBar.open("Storage was not created:", element.name, {
          duration: 6000,
        });
      }
    );
  }

  onCreateMetadata(element) {
    this.infoService.createMetadata(element.name).subscribe(
      (val) => {
        this.sharedCommunicationService.updateListOfPackages$.next();
        this._snackBar.open("Metadata created:" , val.metadataName, {
          duration: 6000,
        });

        //this.info.emit({ order: element.position });
        this.sharedCommunicationService.fromListToMetadata.name = element.name;
      },
      (err) => {
        this._snackBar.open("Metadata was not created:", element.name, {
          duration: 6000,
        });
      }
    );
  }

  onOpenDeletePackageDialog(element) {
    this.dialog.open(DeletePackageDialog, {data: {name: element.name}});
  }

  onOpenCreatePackageDialog() {
    this.dialog.open(CreatePackageDialog);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  displayedColumns: string[] = ['description', 'name', 'info', 'storage', 'delete'];
}


@Component({
  selector: 'dialog-content-example-dialog',
  template: `
        <form #dialogForm="ngForm" class="dialog-form">
          <mat-form-field class="example-form-field">
            <input ngModel matInput type="text" name="name" placeholder="Package Name">
          </mat-form-field>
          <button (click)="onCreate(dialogForm)" 
                  mat-raised-button color="primary">
            Create
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
export class CreatePackageDialog {
  constructor(private storageService: StorageService,
              private dialogRef: MatDialogRef<CreatePackageDialog>,
              private sharedCommunicationService: SharedCommunicationService,
              private _snackBar: MatSnackBar) {}
  onCreate(dialogForm: NgForm) {
    let createStorageRequest: CreateStorageRequest = {storageName: dialogForm.value.name};
    this.storageService.createStorage(createStorageRequest).subscribe(
      (val) => {
        this.sharedCommunicationService.updateListOfPackages$.next()
        this.openSnackBar(val.createStorageMessage, '');
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
  selector: 'delete-package-dialog',
  template: `
        <h1 mat-dialog-title>Are you sure you want to delete the package {{data.name}} and its content?</h1>
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
export class DeletePackageDialog {
  constructor(
              private packageService: PackageService,
              private dialogRef: MatDialogRef<DeletePackageDialog>,
              private sharedCommunicationService: SharedCommunicationService,
              private _snackBar: MatSnackBar,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  onDelete() {
    let deletePackageRequest: DeletePackageRequest = {packageName: this.data.name};
    this.packageService.deletePackage(deletePackageRequest).subscribe((response) => {
      this.sharedCommunicationService.updateListOfPackages$.next()
        this.openSnackBar(response.deleteMessage, '');
        this.dialogRef.close();
        this.router.navigate(['/home']);
    },
    (err) => {
      console.error(err);
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 6000,
    });
  }
}