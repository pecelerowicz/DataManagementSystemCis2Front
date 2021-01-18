import { Component, OnInit } from '@angular/core';
import {
  StorageListService,
  Package,
  Packages,
} from '../../../services/storage-list.service';

export interface PeriodicElement {
  name: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { description: '1', name: 'Hydrogennnnnnnnn4444nsssnnggssnnssssnn' },
  { description: '2', name: 'Helium' },
  { description: '3', name: 'Lithium' },
  { description: '4', name: 'Beryllium' },
  { description: '5', name: 'Boron' },
  { description: '6', name: 'Carbon' },
  { description: '7', name: 'Nitrogen' },
  { description: '8', name: 'Oxygen' },
  { description: '9', name: 'Fluorine' },
  { description: '10', name: 'Neon' },
];

@Component({
  selector: 'app-storage-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.css'],
})
export class StorageListComponent implements OnInit {
  constructor(private storageListService: StorageListService) {}

  ngOnInit(): void {
    let fetch: PeriodicElement[] = [];
    this.storageListService.getChildren().subscribe((val) => {
      // console.log(val);
      //fetch = val;

      let counter: number = 1;
      for (let a of val.children) {
        fetch.push({ description: counter.toString(), name: a.relative });
        counter++;
      }
      console.log(fetch);

      this.dataSource = fetch;
    });
  }

  displayedColumns: string[] = ['description', 'name', 'info', 'storage'];
  dataSource = ELEMENT_DATA;
}
