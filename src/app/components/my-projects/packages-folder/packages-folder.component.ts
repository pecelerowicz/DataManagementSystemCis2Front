import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { SharedCommunicationService } from '../../../services/shared-communication.service';
import { Node } from '../../../dto/storage';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { UploadService } from '../../../services/upload.service';
import { Location } from '@angular/common';

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
  selector: 'app-packages-folder',
  templateUrl: './packages-folder.component.html',
  styleUrls: ['./packages-folder.component.css']
})
export class PackagesFolderComponent implements OnInit {

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
              private projectService: ProjectService,
              private uploadService: UploadService,
              private location: Location) { }

  state: {projectId: number, infoName: string, userName: string} = {projectId: -1, infoName: '', userName: ''};

  ngOnInit(): void {
    this.state = this.sharedCommunicationService.fromMyProjectsPackagesToPackagesFolderData
  
    this.projectService.getPackageFolderStructureOfUserAndProject(
      this.state.projectId, this.state.userName, this.state.infoName
    ).subscribe(val => {
      console.log(val);
      this.dataSource.data = val.children;

    })
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  isEmptyFolder = (_: number, node: ExampleFlatNode) => node.folder && !node.expandable;

  onDownload(val) {
    // this.uploadService.download(this.name, val);
    this.uploadService.downloadFileOfProject(
      this.state.projectId, this.state.userName, this.state.infoName, val
    );
    console.log(val);
  }

  onGoBack() {
    this.location.back();
  }

}
