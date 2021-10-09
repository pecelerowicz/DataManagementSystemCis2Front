import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { SharedCommunicationService } from '../../../services/shared-communication.service';

@Component({
  selector: 'app-packages-info',
  templateUrl: './packages-info.component.html',
  styleUrls: ['./packages-info.component.css']
})
export class PackagesInfoComponent implements OnInit {

  constructor(private projectService: ProjectService,
              private sharedCommunitationService: SharedCommunicationService) { }

  state: {projectId: number, projectName: string, userName: string} = {projectId: -1, projectName: '', userName: ''};

  ngOnInit(): void {
    this.state = this.sharedCommunitationService.fromMyProjectsPackagesToPackagesInfoData;
    console.log('---');
    console.log(this.state);
    console.log('---');
    this.pullData();
  }

  pullData() {
    this.projectService.getInfoOfUserAndProject(this.state.projectId, 
      this.state.userName, this.state.projectName).subscribe(val => {
        console.log(val);
      }, err => {
        console.log(err);
      })
  }

}
