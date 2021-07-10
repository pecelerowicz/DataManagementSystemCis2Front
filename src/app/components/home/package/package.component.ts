import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PackageService } from '../../../services/package.service';
import { SharedCommunicationService } from '../../../services/shared-communication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StorageService } from 'src/app/services/storage.service';
import { CreateStorageRequest } from 'src/app/dto/my_storage';
import { InfoService } from 'src/app/services/info.service';
import { CreateMetadataDialogComponent } from 'src/app/components/home/package/dialogs/create-metadata-dialog/create-metadata-dialog.component';
import { CreatePackageDialogComponent } from './dialogs/create-package-dialog/create-package-dialog.component';
import { DeletePackageDialogComponent } from './dialogs/delete-package-dialog/delete-package-dialog.component';

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
    let createStorageRequest: CreateStorageRequest = {storageName: element.name};
    this.storageService.createStorage(createStorageRequest).subscribe(
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
    this.dialog.open(CreateMetadataDialogComponent, {data: {name: element.name}});
  }

  onOpenDeletePackageDialog(element) {
    this.dialog.open(DeletePackageDialogComponent, {data: {name: element.name}});
  }

  onOpenCreatePackageDialog() {
    this.dialog.open(CreatePackageDialogComponent);
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
