import { Component, OnInit } from '@angular/core';
import { PingService } from '../../services/ping.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pingMessage: string = '';

  constructor(pingService: PingService) {
    pingService.getPing().subscribe((data) => {
      this.pingMessage = data.value;
    });
  }

  ngOnInit(): void {}
}
