import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedCommunicationService } from '../../../services/shared-communication.service';
import { ConsoleReporter } from 'jasmine';

interface Node {
  relative: string;
  children?: Node[];
}

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
              private sharedCommunicationService: SharedCommunicationService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.order = parseInt(params.get('order'));

      console.log("order: " + this.order)

      this.httpClient
        .get<Node>('http://localhost:8080/api/storage')
        .subscribe((val) => {
          this.dataSource.data = val.children[this.order-1].children;
        });
    });
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  onDownload(val) {
    console.log("download " + val);
  }

  onUpload(val) {
    this.sharedCommunicationService.passParam = {name: 'upload', path: val};
    this.sharedCommunicationService.componentChangeEmitter.emit();
  }
}
