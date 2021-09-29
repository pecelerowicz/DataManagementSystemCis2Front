import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {

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

}
