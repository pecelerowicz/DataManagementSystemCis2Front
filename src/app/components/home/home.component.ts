import { Component, OnInit } from '@angular/core';
import { PingService } from '../../services/ping.service';
import { DataSetService, DataSetModel } from '../../services/data-set.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pingData: string[] = [];
  dataSets: DataSetModel[] = [];

  constructor(pingService: PingService, dataSetService: DataSetService) {
    pingService.getPing().subscribe((data) => {
      this.pingData = data.values;
    });

    dataSetService.getMyDataSets().subscribe((data) => {
      this.dataSets = data;
    });

    setTimeout(() => {
      console.log(this.dataSets);
    }, 2000);
  }

  ngOnInit(): void {}
}
