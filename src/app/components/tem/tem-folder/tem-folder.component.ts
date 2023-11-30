import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { Node } from '../../../dto/my_data';
import { TemFolderService } from 'src/app/services/tem-folder.service';


/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

 

@Component({
  selector: 'app-tem-folder',
  templateUrl: './tem-folder.component.html',
  styleUrls: ['./tem-folder.component.css']
})
export class TemFolderComponent implements OnInit {
  TREE_DATA: Node[] = [];

  treeControl = new NestedTreeControl<Node>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Node>();

  constructor(private temFolderService: TemFolderService) {
    this.dataSource.data = this.TREE_DATA;
  }
  ngOnInit(): void {
      this.temFolderService.getTemMainFolder().subscribe((val) => {
      this.TREE_DATA = (val.folderStructure).children
      this.dataSource.data = this.TREE_DATA;
    });


  }

  hasChild = (_: number, node: Node) => !!node.children && node.children.length > 0;
}