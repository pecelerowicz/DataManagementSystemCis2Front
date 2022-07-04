import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyProjectsService } from '../../../services/my-projects.service';
import { CreateProjectDialogComponent} from '../../../components/my-projects/projects-list/dialogs/create-project-dialog/create-project-dialog.component';
import { SharedCommunicationService } from '../../../services/shared-communication.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeleteProjectDialogComponent } from './dialogs/delete-project-dialog/delete-project-dialog.component';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  @Output() description = new EventEmitter<{id: number}>();
  @Output() members = new EventEmitter<{id: number}>();
  @Output() packages = new EventEmitter<{id: number}>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['date', 'name', 'description', 'packages', 'members', 'delete'];
  dataSource: MatTableDataSource<{id: number, created: string, name: string, position: number}>;

  constructor(private myProjectsService: MyProjectsService,
              private dialog: MatDialog,
              private sharedCommunicationService: SharedCommunicationService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }  

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();

    this.getProjects();
    this.sharedCommunicationService.createProject$.subscribe(val => {
      this.getProjects();
    })

    this.sharedCommunicationService.updateListOfProjects$.subscribe(val => {
      this.getProjects();
    })
  }

  getProjects() {
    let fetch: {id: number, created: string, name: string, position: number}[] = [];
    //let projectList: GetProjectResponse[] = [];
    this.myProjectsService.getOwnedProjects().subscribe(val => {
      let counter: number = 1;
      for(let sm of val.getProjectResponseList) {
        fetch.push({id: sm.id, created: sm.localDate, name: sm.name,  
          position: counter});
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

  onOpenDeleteProjectDialog(element) {
    this.dialog.open(DeleteProjectDialogComponent, {data: {id: element.id}});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
