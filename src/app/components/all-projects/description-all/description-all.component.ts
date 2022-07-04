import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { getInitialValueDescription } from '../../../mappers/project/project';
import { AllProjectsService } from '../../../services/all-projects.service';

@Component({
  selector: 'app-description-all',
  templateUrl: './description-all.component.html',
  styleUrls: ['./description-all.component.css']
})
export class DescriptionAllComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private allProjectsService: AllProjectsService) { }

  public id: number = -1;
  public projectName: string = '';
  public isDisabled: boolean = true;
  description = getInitialValueDescription();

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id'));
      this.getDescriptionAndName();
    })
  }

  getDescriptionAndName() {
    this.allProjectsService.getProject(this.id).subscribe(val => {
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

}
