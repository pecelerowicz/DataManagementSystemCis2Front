import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UpdateProjectRequest } from '../../../dto/my_project';
import { getInitialValueDescription } from '../../../mappers/project/project';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private _snackBar: MatSnackBar) { }

  public id: number = -1;
  public projectName: string = '';
  public isDisabled: boolean = true;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id'));
      this.getDescriptionAndName();
    })
  }

  description = getInitialValueDescription();

  toggleIsFormDisabled() {
    if(this.description.controls['description'].disabled) {
      this.description.controls['description'].enable();
      this.isDisabled = false;
    } else {
      this.description.controls['description'].disable();
      this.isDisabled = true;
    }
  }

  getDescriptionAndName() {
    this.projectService.getOwnedProject(this.id).subscribe(val => {
      let description: string = val.description;
      this.projectName = val.name;
      this.description.patchValue({
        description: description
      });
    }, 
    err => {
      console.log(err);
    })
  }

  giveUpChanges() {
    this.getDescriptionAndName();
    this.description.controls['description'].disable();
    this.isDisabled = true;
  }

  saveChanges() {
    let updateProjectRequest: UpdateProjectRequest = {
      projectId: this.id,
      newName: this.projectName,
      newDescription: this.description.controls['description'].value,
    }
    this.projectService.updateOwnedProject(updateProjectRequest).subscribe(val => {
      this.id = val.id;
      this.projectName = val.projectName;
      this.description.controls['description'].setValue(val.description);
      this.description.controls['description'].disable();
      this.isDisabled = true;
      this._snackBar.open("Project description was updated", "", {
        duration: 6000,
      });
    },
    error => {
      this._snackBar.open("Not updated", error.error.message, {
        duration: 6000,
      });
    })
  }

}
