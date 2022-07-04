import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AllProjectsService } from '../../../services/all-projects.service';

@Component({
  selector: 'app-project-list-all',
  templateUrl: './project-list-all.component.html',
  styleUrls: ['./project-list-all.component.css']
})
export class ProjectListAllComponent implements OnInit {

  @Output() description = new EventEmitter<{id: number}>();
  @Output() members = new EventEmitter<{id: number}>();
  @Output() packages = new EventEmitter<{id: number}>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['date', 'name', 'owner', 'members', 'description', 'packages'];
  dataSource: MatTableDataSource<{id: number, created: string, name: string, owner: string, position: number}>;

  constructor(private allProjectsService: AllProjectsService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  } 

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getProjects();
  }

  getProjects() {
    let fetch: {id: number, created: string, name: string, owner: string, position: number}[] = [];
    //let projectList: GetProjectResponse[] = [];
    this.allProjectsService.getProjects().subscribe(val => {
      let counter: number = 1;
      for(let sm of val.getProjectResponseList) {
        fetch.push({id: sm.id, created: sm.localDate, name: sm.name,  
          owner: sm.ownerName, position: counter});
        counter++;
      }
      this.dataSource.data = fetch;
      // projectList = val.getProjectResponseList;
      // this.dataSource.data = projectList;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
