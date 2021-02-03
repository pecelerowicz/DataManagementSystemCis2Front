import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  StorageListService,
  Package,
} from '../../../services/storage-list.service';
import { SharedCommunicationService } from '../../../services/shared-communication.service';

@Component({
  selector: 'app-storage-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.css'],
})
export class StorageListComponent implements OnInit {
  @Output() info = new EventEmitter<{ order: number }>();
  @Output() storage = new EventEmitter<{ order: number }>();

  dataSource = [];

  constructor(private storageListService: StorageListService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    let fetch: Package[] = [];
    this.storageListService.getChildren().subscribe((val) => {
      console.log(val);

      let counter: number = 1;
      for (let a of val.children) {
        fetch.push({ relative: a.relative, order: counter });
        counter++;
      }
      console.log(fetch);

      this.dataSource = fetch;
    });
  }

  onInfo(element) {
    this.info.emit({ order: element.order });
  }

  onStorage(element) {
    this.storage.emit({ order: element.order });
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
              private router: Router,
              private dialogRef: MatDialogRef<CreatePackageDialog>,
              private sharedCommunicationService: SharedCommunicationService) {}
  onCreate(dialogForm: NgForm) {
    this.storageListService.createPackage(dialogForm.value.name).subscribe(() => {
      console.log("New package " + dialogForm.value.name + " created!")

      this.sharedCommunicationService.createPackageEmitter.emit();


      // this.router.navigate(['/home']);
      this.dialogRef.close();
    });
  }

}