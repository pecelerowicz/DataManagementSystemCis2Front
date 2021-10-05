import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() description = new EventEmitter<{id: number}>();
  @Output() members = new EventEmitter<{id: number}>();
  @Output() packages = new EventEmitter<{id: number}>();

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

  onDescription(element) {
    this.description.emit({id: element.id});
  }

  onMembers(element) {
    this.members.emit({id: element.id});
  }

  onPackages(element) {
    this.packages.emit({id: element.id});
  }
}
