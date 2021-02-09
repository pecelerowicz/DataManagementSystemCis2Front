import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  StorageListService,
} from '../../../services/storage-list.service';
import { SharedCommunicationService } from '../../../services/shared-communication.service';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-storage-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.css'],
})
export class StorageListComponent implements OnInit {
  @Output() info = new EventEmitter<{ order: number }>();
  @Output() storage = new EventEmitter<{ order: number }>();

  dataSource: {name: string, position: number}[] = [];

  constructor(private storageListService: StorageListService,
              private sharedCommunicationService: SharedCommunicationService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
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
      this.dataSource = fetch;
    });
  }

  onInfo(element) {
    this.info.emit({ order: element.position });
  }

  onStorage(element) {
    this.storage.emit({ order: element.position });
  }

  onOpenCreatePackageDialog() {
      this.dialog.open(CreatePackageDialog);
  }

  displayedColumns: string[] = ['description', 'name', 'info', 'storage'];
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
        //this.sharedCommunicationService.createPackageEmitter.emit();
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