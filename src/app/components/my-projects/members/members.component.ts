import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AddUserRequest } from '../../../dto/my_project';
import { AuthService } from '../../../services/auth.service';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private projectService: ProjectService) { }

  public id: number = -1;
  public projectName: string = '';

  users: string[] = [];
  members: string[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id'));
      this.getProjectDetails();
      this.getUsers();
    });
  }

  getProjectDetails() {
    this.projectService.getOwnedProject(this.id).subscribe(val => {
      this.projectName = val.name;
      
      this.members = [];
      this.members.push(val.ownerName + " (owner)");
      for(let memberName of val.memberNames) {
        if(val.ownerName !== memberName) {
          this.members.push(memberName);
        }
      } 
    },
    err => {
      console.log(err);
    })
  }

  getUsers() {
    this.authService.getUsers().subscribe(val => {
      this.users = val;
    },
    err => {
      console.log(err);
    })
  }

  onUser(user) {
    console.log(user);
    let payload: AddUserRequest = {
      projectId: this.id,
      userName: user
    }
    this.projectService.addUserToOwnedProject(payload).subscribe(val => {
      // to można lepiej zrobić...
      this.getProjectDetails();
      this.getUsers();
    })
  }

}