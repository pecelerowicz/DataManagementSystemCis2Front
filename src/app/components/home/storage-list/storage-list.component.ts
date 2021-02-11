import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  StorageListService,
} from '../../../services/storage-list.service';
import { SharedCommunicationService } from '../../../services/shared-communication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-storage-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.css'],
})
export class StorageListComponent implements OnInit {
  @Output() info = new EventEmitter<{ order: number }>();
  @Output() storage = new EventEmitter<{ order: number }>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<{name: string, position: number}>;

  constructor(private storageListService: StorageListService,
              private sharedCommunicationService: SharedCommunicationService,
              private dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }  

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getPackagesNames();
    this.sharedCommunicationService.updateListOfPackages$.subscribe(() => {
      this.getPackagesNames();
    })
  }

  private getPackagesNames() {
    let fetch: {name: string, position: number}[] = [];
    this.storageListService.getPackagesNames().subscribe((val) => {
      let counter: number = 1;
      for (let packageName of val.packagesNames) {
        fetch.push({ name: packageName, position: counter });
        counter++;
      }
      this.dataSource.data = fetch;
    });
  }

  onInfo(element) {
    this.info.emit({ order: element.position });
  }

  onStorage(element) {
    this.storage.emit({ order: element.position });
  }

  onOpenDeletePackageDialog(element) {
    this.dialog.open(DeletePackageDialog);
    // console.log("delete " + element.position)
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
  constructor(private storageListService: StorageListService,
              private dialogRef: MatDialogRef<CreatePackageDialog>,
              private sharedCommunicationService: SharedCommunicationService,
              private _snackBar: MatSnackBar) {}
  onCreate(dialogForm: NgForm) {
    this.storageListService.createPackage(dialogForm.value.name).subscribe(
      (val) => {
        this.sharedCommunicationService.updateListOfPackages$.next()
        this.openSnackBar('Created Package:', val.packageName);
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
        <!-- <form #dialogForm="ngForm" class="dialog-form"> -->
          <!-- <mat-form-field class="example-form-field">
            <input ngModel matInput type="text" name="name" placeholder="Package Name">
          </mat-form-field> -->
          <button (click)="onDelete()" 
                  mat-raised-button color="primary">
            Delete
          </button>
        <!-- </form> -->
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
  constructor(private _snackBar: MatSnackBar) {}
  onDelete() {
    
  }
}