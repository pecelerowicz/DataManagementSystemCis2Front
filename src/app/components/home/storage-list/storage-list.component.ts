import { Component, OnInit } from '@angular/core';
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
  constructor(private storageListService: StorageListService) {}

  dataSource: Package[] = [];

  ngOnInit() {
    let a: Package[] = [];
    this.storageListService.getChildren().subscribe((val) => {
      for (let entry of val.children) {
        this.dataSource.push(entry);
        a.push(entry);
      }
    });
    setTimeout(() => {
      this.dataSource = a;
    }, 1000);
  }

  displayedColumns: string[] = ['relative'];
  //dataSource = [{ relative: 'michal' }]; //this.names;
}
