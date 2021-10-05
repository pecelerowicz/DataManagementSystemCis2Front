import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-members-all',
  templateUrl: './members-all.component.html',
  styleUrls: ['./members-all.component.css']
})
export class MembersAllComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private projectService: ProjectService) { }

  public id: number = -1;
  public projectName: string = '';
  members: string[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id'));
      this.getProjectDetails();
    });
  }

  getProjectDetails() {
    this.projectService.getProject(this.id).subscribe(val => {
      this.projectName = val.name;

      this.members = [];
      for(let memberName of val.memberNames) {
        if(val.ownerName !== memberName) {
          this.members.push(memberName);
        } else {
          this.members.push(val.ownerName + " (owner)");
        }
      } 
    },
    err => {
      console.log(err);
    })
  }

}
