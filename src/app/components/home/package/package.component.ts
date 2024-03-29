import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { SharedCommunicationService } from '../../../services/shared-communication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CreateStorageRequest } from 'src/app/dto/my_data';
import { CreateMetadataDialogComponent } from 'src/app/components/home/package/dialogs/create-metadata-dialog/create-metadata-dialog.component';
import { CreatePackageDialogComponent } from './dialogs/create-package-dialog/create-package-dialog.component';
import { DeletePackageDialogComponent } from './dialogs/delete-package-dialog/delete-package-dialog.component';
import { ArchivePackageDialogComponent } from './dialogs/archive-package-dialog/archive-package-dialog.component';
import { MyDataService } from 'src/app/services/my-data.service';
import { RenamePackageDialogComponent } from './dialogs/rename-package-dialog/rename-package-dialog.component';
import { FormControl } from '@angular/forms';

export interface DialogData {
  name: string;
  order: number;
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

  dataSource: MatTableDataSource<Row>;
  filterValue: string = '';

  constructor(private myDataService: MyDataService,
              private sharedCommunicationService: SharedCommunicationService,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar) {} 

  message = new FormControl('Info about the action Info about the action Info about the action');

  ngOnInit(): void {
    this.getPackageList();
    this.sharedCommunicationService.updateListOfPackages$.subscribe(() => {
      this.getPackageList();
    });
    this.sharedCommunicationService.createMetadataInDialog$.subscribe(val => {
      this.info.emit({ order: val.order });
      this.sharedCommunicationService.fromListToMetadata.name = val.name;
    })
  }

  private getPackageList() {
    let fetch: Row[] = [];
    this.myDataService.getPackageList().subscribe(val => {
      let counter: number = 1;
      for(let sm of val.packageResponseList) {
        fetch.push({name: sm.name, hasStorage: sm.hasStorage, 
          hasMetadata: sm.hasMetadata, archived: sm.archived, localDate: sm.localDate, 
          title: sm.title, shortDescription: sm.shortDescription, position: counter});
        counter++;
      }
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = fetch;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filter = this.filterValue.trim()
    })
  }

  onInfo(element) {
    console.log(element);
    this.info.emit({ order: element.position });
    this.sharedCommunicationService.fromListToMetadata.name = element.name;
  }

  onStorage(element) {
    this.storage.emit({ order: element.position });
    this.sharedCommunicationService.fromListToStorage.name = element.name;
  }

  onOpenRenameDialog(element) {
    this.dialog.open(RenamePackageDialogComponent, {data: {order: element.position, name: element.name}});
  }

  onDummy(element) {
    console.log(element)
  }

  onCreateStorage(element) {
    let createStorageRequest: CreateStorageRequest = {storageName: element.name};
    this.myDataService.createStorage(createStorageRequest).subscribe(
      (val) => {
        this.sharedCommunicationService.updateListOfPackages$.next();
        this._snackBar.open(val.createStorageMessage, "", {
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

  onOpenCreateMetadataDialog(element) {
    this.dialog.open(CreateMetadataDialogComponent, {data: {order: element.position, name: element.name}});
  }

  onOpenDeletePackageDialog(element) {
    this.dialog.open(DeletePackageDialogComponent, {data: {name: element.name}});
  }

  onOpenArchivePackageDialog(element) {
    this.dialog.open(ArchivePackageDialogComponent, {data: {name: element.name}});
  }

  onOpenCreatePackageDialog() {
    this.dialog.open(CreatePackageDialogComponent);
  }

  applyFilter(event: Event) {
    //const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim()//.toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  displayedColumns: string[] = ['date', 'name', 'info', 'storage', 'delete'];
}

interface Row {
  name: string, 
  hasStorage: boolean, 
  hasMetadata: boolean, 
  archived: boolean,
  localDate: string, 
  title: string,
  shortDescription: string,
  position: number
}

