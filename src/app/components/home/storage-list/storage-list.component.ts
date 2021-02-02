import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  StorageListService,
  Package,
} from '../../../services/storage-list.service';

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
    <div>
      asdf
    </div>
  `,
})
export class CreatePackageDialog {}