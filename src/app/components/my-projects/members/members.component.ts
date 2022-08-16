import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AddUserRequest, RemoveUserFromOwnedProjectRequest } from '../../../dto/my_project';
import { AuthService } from '../../../services/auth.service';
import { MyProjectsService } from '../../../services/my-projects.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private myProjectsService: MyProjectsService,
              private _snackBar: MatSnackBar) { }

  public id: number = -1;
  public projectName: string = '';
  public ownerName: string = '';

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
    this.myProjectsService.getOwnedProject(this.id).subscribe(val => {
      this.projectName = val.name;
      this.ownerName = val.ownerName;
      
      this.members = [];
      this.members.push(val.ownerName);
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

  onAddUser(user) {
    let payload: AddUserRequest = {
      projectId: this.id,
      userName: user
    }
    this.myProjectsService.addUserToOwnedProject(payload).subscribe(val => {
      this.getProjectDetails();
      this.getUsers();
      this._snackBar.open("User added", "", {
        duration: 6000,
      });
    }, err => {
      this._snackBar.open("User not added", err.error.message, {
        duration: 6000
      })
    })
  }

  onRemoveUser(val) {
    let payload: RemoveUserFromOwnedProjectRequest = {
      projectId: this.id,
      userName: val
    }
    this.myProjectsService.removeUserFromOwnedProject(payload).subscribe(val => {
      // to można lepiej zrobić...
      this.getProjectDetails();
      this.getUsers();
      this._snackBar.open("User removed", "", {
        duration: 6000,
      });
    }, err => {
      this._snackBar.open("User not removed", err.error.message, {
        duration: 6000
      })
    })
  }




}