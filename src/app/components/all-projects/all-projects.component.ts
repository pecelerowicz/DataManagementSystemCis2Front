import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onDescription(val) {
    this.router.navigate(['description', val.id], { relativeTo: this.route });
  }
  
  onMembers(val) {
    this.router.navigate(['members', val.id], { relativeTo: this.route });
  }

  onPackages(val) {
    this.router.navigate(['packages', val.id], { relativeTo: this.route });
  }

}
