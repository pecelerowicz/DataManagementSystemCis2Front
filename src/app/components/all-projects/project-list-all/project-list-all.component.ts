import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GetProjectResponse } from '../../../dto/my_project';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-project-list-all',
  templateUrl: './project-list-all.component.html',
  styleUrls: ['./project-list-all.component.css']
})
export class ProjectListAllComponent implements OnInit {

  @Output() description = new EventEmitter<{id: number}>();
  @Output() members = new EventEmitter<{id: number}>();
  @Output() packages = new EventEmitter<{id: number}>();

  displayedColumns: string[] = ['date', 'name', 'owner', 'members', 'description', 'packages'];
  dataSource: GetProjectResponse[] = [];
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    let projectList: GetProjectResponse[] = [];
    this.projectService.getProjects().subscribe(val => {
      projectList = val.getProjectResponseList;
      this.dataSource = projectList;
      console.log(val);
    },
    err => {
      console.log(err);
    })
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
