import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetProjectResponse } from '../../../dto/my_project';
import { ProjectService } from '../../../services/project.service';
import { CreateProjectDialogComponent} from '../../../components/my-projects/projects-list/dialogs/create-project-dialog/create-project-dialog.component';
import { SharedCommunicationService } from '../../../services/shared-communication.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  displayedColumns: string[] = ['date', 'name', 'description', 'packages', 'members', 'delete'];
  dataSource: GetProjectResponse[] = [];
  constructor(private projectService: ProjectService,
              private dialog: MatDialog,
              private sharedCommunicationService: SharedCommunicationService) { }

  ngOnInit(): void {
    this.getProjects();
    this.sharedCommunicationService.createProject$.subscribe(val => {
      this.getProjects();
    })

  }

  getProjects() {
    let projectList: GetProjectResponse[] = [];
    this.projectService.getOwnedProjects().subscribe(val => {
      console.log(val);
      projectList = val.getProjectResponseList;
      this.dataSource = projectList;
    },
    err => {
      console.log(err);
    })
  }

  onOpenCreateProjectDialog() {
    this.dialog.open(CreateProjectDialogComponent);
  }
}
