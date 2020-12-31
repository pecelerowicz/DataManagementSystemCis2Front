import { Component, OnInit } from '@angular/core';
import { PingService } from '../../services/ping.service';
import { DataSetService, DataSetModel } from '../../services/data-set.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  dataSets: DataSetModel[] = [];

  constructor(private dataSetService: DataSetService) {}

  ngOnInit(): void {
    this.dataSetService.getMyDataSets().subscribe((data) => {
      this.dataSets = data;
    });
  }
}
