import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  public id: number = -1;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id'));
      // this.getProjectDetails();
      // this.getUsers();
    });
  }

}
