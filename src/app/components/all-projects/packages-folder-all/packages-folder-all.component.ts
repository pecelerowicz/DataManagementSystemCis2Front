import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Node } from '../../../dto/my_data';
import { SharedCommunicationService } from '../../../services/shared-communication.service';
import { Location } from '@angular/common';
import { AllProjectsService } from 'src/app/services/all-projects.service';

export interface DialogData {
  order: number;
  name: string;
  subfolderName: string;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  folder: boolean;
}

@Component({
  selector: 'app-packages-folder-all',
  templateUrl: './packages-folder-all.component.html',
  styleUrls: ['./packages-folder-all.component.css']
})
export class PackagesFolderAllComponent implements OnInit {

  private _transformer = (node: Node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.relative,
      level: level,
      folder: node.folder
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private sharedCommunicationService: SharedCommunicationService,
              private allProjectsService: AllProjectsService,
              private location: Location) { }

  state: {projectId: number, infoName: string, userName: string} = {projectId: -1, infoName: '', userName: ''};

  ngOnInit(): void {
    this.state = this.sharedCommunicationService.fromAllProjectsPackagesToPackagesFolderData
  
    this.allProjectsService.getPackageFolderStructureOfUserAndProject(
      this.state.projectId, this.state.userName, this.state.infoName
    ).subscribe(val => {
      console.log(val);
      this.dataSource.data = val.children;

    })
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  isEmptyFolder = (_: number, node: ExampleFlatNode) => node.folder && !node.expandable;

  onDownload(val) {
    this.allProjectsService.downloadFileOfProject(
      this.state.projectId, this.state.userName, this.state.infoName, val
    );
    console.log(val);
  }

  onGoBack() {
    this.location.back();
  }

}
