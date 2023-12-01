import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { Node } from '../../../dto/my_data';
import { TemFolderService } from 'src/app/services/tem-folder.service';
 

interface TreeNode {
  expandable: boolean;
  name: string;
  level: number;
  folder: boolean;
}

@Component({
  selector: 'app-tem-folder',
  templateUrl: './tem-folder.component.html',
  styleUrls: ['./tem-folder.component.css']
})
export class TemFolderComponent implements OnInit {
  TREE_DATA: Node[] = [];

  // TREE API
  treeControl = new FlatTreeControl<TreeNode>((node) => node.level, (node) => node.expandable);
  
  private _transformer = (node: Node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.relative,
      level: level,
      folder: node.folder
    };
  };
  
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  // END OF TREE API

  hasChild = (_: number, node: TreeNode) => node.expandable;

  isEmptyFolder = (_: number, node: TreeNode) => node.folder && !node.expandable;

  constructor(private temFolderService: TemFolderService) {
    this.dataSource.data = this.TREE_DATA;
  }

  ngOnInit(): void {
      this.temFolderService.getTemMainFolder().subscribe((val) => {
      this.TREE_DATA = val.folderStructure.children
      this.dataSource.data = this.TREE_DATA;
      console.log(this.TREE_DATA);
    });
  }
  
}