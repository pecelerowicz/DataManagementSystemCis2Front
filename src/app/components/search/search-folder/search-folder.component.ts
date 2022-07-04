import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AllDataService } from 'src/app/services/all-data.service';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';
import { Node } from '../../../dto/my_data';

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
  selector: 'app-search-folder',
  templateUrl: './search-folder.component.html',
  styleUrls: ['./search-folder.component.css']
})
export class SearchFolderComponent implements OnInit {

  order: number;
  name: string;
  username: string;

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
              private allDataService: AllDataService,
              private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.order = this.sharedCommunicationService.fromSearchToStorage.position;
      this.name = this.sharedCommunicationService.fromSearchToStorage.name;
      this.username = this.sharedCommunicationService.fromSearchToStorage.username;
      this.allDataService.getPackageFolderStructureOfUser(this.username, this.name).subscribe((val) => {
        this.dataSource.data = val.children;
      })
    });

  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  isEmptyFolder = (_: number, node: ExampleFlatNode) => node.folder && !node.expandable;

  onDownload(val: string) {
    console.log(val);
  }

  onDownloadFileOfUser(val) {
    this.allDataService.downloadFileOfUser(this.username, this.name, val)
  }

  onTestDisplay() {
    console.log(this.sharedCommunicationService.fromSearchToStorage);
  }

}
