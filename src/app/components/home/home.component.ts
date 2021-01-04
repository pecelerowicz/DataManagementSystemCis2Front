import { Component, OnInit } from '@angular/core';
import { DataSetService, DataSetModel } from '../../services/data-set.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  dataSets: DataSetModel[] = [];

  pageNumber: number = 0;
  pageSize: number = 10;

  constructor(private dataSetService: DataSetService) {}

  ngOnInit(): void {
    this.dataSetService
      .getMyDataSetsPagination(this.pageNumber, this.pageSize)
      .subscribe((data) => {
        this.dataSets = data;
      });
  }
}
