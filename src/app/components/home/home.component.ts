import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private sharedCommunicationService: SharedCommunicationService) {

    this.sharedCommunicationService.componentChangeEmitter.subscribe(() => {
      this.router.navigate([sharedCommunicationService.passParam.name], { relativeTo: this.route });
    });

    this.sharedCommunicationService.createPackageEmitter.subscribe(() => {
      window.location.reload();    
    })
              
  }

  ngOnInit(): void {
    
  }

  onInfo(val): void {
    this.router.navigate(['info', val.order], { relativeTo: this.route });
  }

  onStorage(val): void {
    this.router.navigate(['storage', val.order], { relativeTo: this.route });
  }

}
