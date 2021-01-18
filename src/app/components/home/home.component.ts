import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onInfo(val): void {
    this.router.navigate(['info', val.order], { relativeTo: this.route });
  }

  onStorage(val): void {
    this.router.navigate(['storage', val.order], { relativeTo: this.route });
  }

  onCatchEvent($event) {
    console.log($event);
  }
}
