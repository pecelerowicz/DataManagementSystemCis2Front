import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FolderService } from 'src/app/services/folder.service';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';
import { UploadService } from 'src/app/services/upload.service';
import { Node } from '../../../dto/storage';

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
              private folderService: FolderService,
              private uploadService: UploadService,
              private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.order = this.sharedCommunicationService.fromSearchToStorage.position;
      this.name = this.sharedCommunicationService.fromSearchToStorage.name;
      this.username = this.sharedCommunicationService.fromSearchToStorage.username;
      this.folderService.getPackageFolderStructureOfUser(this.username, this.name).subscribe((val) => {
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
    this.uploadService.downloadFileOfUser(this.username, this.name, val)
  }

  onTestDisplay() {
    console.log(this.sharedCommunicationService.fromSearchToStorage);
  }

}
