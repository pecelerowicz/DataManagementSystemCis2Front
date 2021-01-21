import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Node {
  relative: string;
  children?: Node[];
}

let TREE_DATA: Node = { relative: '', children: [] };

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
})
export class StorageComponent implements OnInit {
  order: number;

  private _transformer = (node: Node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.relative,
      level: level,
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

  constructor(private route: ActivatedRoute, 
    private httpClient: HttpClient,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.order = parseInt(params.get('order'));

      this.httpClient
        .get<Node>('http://localhost:8080/api/storage')
        .subscribe((val) => {
          console.log(val)
          console.log("---")
          console.log(this.order)
          TREE_DATA = val.children[this.order-1];
          console.log("-----")
          console.log(TREE_DATA)

          this.dataSource.data = TREE_DATA.children;
        });
    });
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  onDownload(val) {
    console.log("download " + val)
  }

  onOpenDialogUpload(val) {
    console.log("dialog upload " + val);
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {data: val});

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `
  <div>
    <h2 mat-dialog-title>Install Angular {{data}}</h2>
  </div>
  `,
})
export class DialogContentExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {} 
}
