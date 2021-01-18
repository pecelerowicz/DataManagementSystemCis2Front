import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  order: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.order = parseInt(this.route.snapshot.paramMap.get('order'));
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.order = parseInt(params.get('order'));
    });
  }
}
