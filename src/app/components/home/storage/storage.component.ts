import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.order = parseInt(params.get('order'));

      this.httpClient
        .get<Node>('http://localhost:8080/api/storage')
        .subscribe((val) => {
          this.dataSource.data = val.children[this.order-1].children;
        });
    });
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  onDownload(val) {
    console.log("download " + val)
  }

  onOpenDialogUpload(val) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {data: val});
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `
  <div>
    <h1>File Upload</h1>
    <input type="file" (change)="onFileSelected($event)">
    <button type="button" (click)="onFileUpload()">Upload</button>
  </div>
  `,
})
export class DialogContentExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
              private httpClient: HttpClient) {} 

  selectedFile: File = null;

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onFileUpload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('internalPath', this.data)
    this.httpClient.post('http://localhost:8080/api/upload', fd, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe((event) => {
        if(event.type === HttpEventType.UploadProgress) {
          console.log('Upload Progress: ' + Math.round(event.loaded * 100 / event.total))
        }
        else if(event.type === HttpEventType.Response) {
          console.log("finished (response)")
          console.log(event)
        }
       
      })
    console.log("upload")
  }
}
