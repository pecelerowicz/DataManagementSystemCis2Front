import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'packages', 'members', 'date'];
  dataSource: ProjectRow[] = [{projectName:"project1dddddd ddddddddddddddd dddddddddddd", owner: "michal", date: "asdf"},
  {projectName:"project2ddddddd ddddddddddddddddd ddddddddd", owner: "michal", date: "asdf"}];// = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}

export interface ProjectRow {
  projectName: string;
  owner: string;
  date: string;
}
