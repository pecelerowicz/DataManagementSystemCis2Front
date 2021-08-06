import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onInfo(val): void {
    this.router.navigate(['info', val.order], { relativeTo: this.route });
  }

  onStorage(val): void {
    this.router.navigate(['storage', val.order], { relativeTo: this.route });
  }

}
