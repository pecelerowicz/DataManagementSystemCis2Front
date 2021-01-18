import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  constructor(private storageListService: StorageListService) {}

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

  displayedColumns: string[] = ['description', 'name', 'info', 'storage'];
}
