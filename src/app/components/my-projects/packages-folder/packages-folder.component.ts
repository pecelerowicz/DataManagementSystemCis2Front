import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { SharedCommunicationService } from '../../../services/shared-communication.service';

@Component({
  selector: 'app-packages-folder',
  templateUrl: './packages-folder.component.html',
  styleUrls: ['./packages-folder.component.css']
})
export class PackagesFolderComponent implements OnInit {

  constructor(private sharedCommunicationService: SharedCommunicationService,
              private projectService: ProjectService) { }

  state: {projectId: number, infoName: string, userName: string} = {projectId: -1, infoName: '', userName: ''};

  ngOnInit(): void {
    this.state = this.sharedCommunicationService.fromMyProjectsPackagesToPackagesFolderData
  
    this.projectService.getPackageFolderStructureOfUserAndProject(
      this.state.projectId, this.state.userName, this.state.infoName
    ).subscribe(val => {
      console.log(val);
    })
  }

}
