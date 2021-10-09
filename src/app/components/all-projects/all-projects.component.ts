import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedCommunicationService } from '../../services/shared-communication.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private sharedCommunicationService: SharedCommunicationService) { }

  ngOnInit(): void {
    this.sharedCommunicationService.fromAllProjectsPackagesToPackagesInfo.subscribe(val => {
      this.router.navigate(['packages-info'], { relativeTo: this.route });
    })
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
