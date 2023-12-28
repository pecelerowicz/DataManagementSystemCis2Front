import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetSearchListRequest, SearchResponse } from 'src/app/dto/all_data';
import { AuthService } from 'src/app/services/auth.service';
import { AllDataService } from 'src/app/services/all-data.service';
import { SharedCommunicationService } from 'src/app/services/shared-communication.service';
import { ShortenNamePipe } from '../../../pipes/shorten-name.pipe';



@Component({
  selector: 'app-search-package',
  templateUrl: './search-package.component.html',
  styleUrls: ['./search-package.component.css']
})
export class SearchPackageComponent implements OnInit {
  @Output() info = new EventEmitter<{order: number, username: string, name: string }>();
  @Output() storage = new EventEmitter<{order: number, username: string, name: string}>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  users: string[];
  types: string[];
  search: FormGroup = getSearch();
  searchList: SearchResponse[];

  displayedColumns: string[] = ['date', 'name', 'username', 'metadata', 'storage'];
  dataSource: MatTableDataSource<SearchRow>;//SearchRow[] = [];

  constructor(private authService: AuthService, 
              private allDataService: AllDataService,
              private sharedCommuncationService: SharedCommunicationService) { }

  ngOnInit(): void {
    this.authService.getUsers().subscribe(
      val => {
        this.users = val;
      },
      err => {
        console.log(err);
      }
    )
    this.allDataService.getTypeList().subscribe(
      val => {
        this.types = val;
      }, 
      err => {
        console.log(err);
      }
    )

  }

  onSearch() {
    let getSearchListRequest: GetSearchListRequest = {
      userName: this.search.controls['user'].value, 
      hasInfo: false,
      hasDifrInfo: false,
      hasTestInfo: false
    }

    if(this.search.controls['type'].value === '') {
      // do nothing
    } else if(this.search.controls['type'].value === 'General') {
      getSearchListRequest.hasInfo = true;
    } else if(this.search.controls['type'].value === 'Difrractometer') {
      getSearchListRequest.hasInfo = true;
      getSearchListRequest.hasDifrInfo = true;
    } else if(this.search.controls['type'].value === 'Test') {
      getSearchListRequest.hasInfo = true;
      getSearchListRequest.hasTestInfo = true;
    } else {
      // do nothing
    } 

    this.allDataService.getSearchList(getSearchListRequest).subscribe(val => {
      this.searchList = val.searchResponseList;
      let fetch: SearchRow[] = [];

      let counter = 1;
      for(let s of val.searchResponseList) {
        fetch.push({position: counter, name: s.name, username: s.username, hasStorage: s.hasStorage, localDate: s.localDate});
        counter++;
      }

      this.dataSource = new MatTableDataSource();
      this.dataSource.data = fetch;
      this.dataSource.paginator = this.paginator;
      console.log(fetch)
    }, 
    err => {
      console.log(err);
    })
  }

  onInfo(element) {
    this.info.emit({order: element.position, username: element.username, name: element.name});
    this.sharedCommuncationService.fromSearchToMetadata = 
      {position: element.position, name: element.name, username: element.username};
  }

  onStorage(element) {
    this.storage.emit({order: element.position, username: element.username, name: element.name});
    this.sharedCommuncationService.fromSearchToStorage =
      {position: element.position, name: element.name, username: element.username};
  }

}

function getSearch(): FormGroup {
  let fb: FormBuilder = new FormBuilder();
  return fb.group({
    user: [''/*, [Validators.required]*/],
    type: [''/*, [Validators.required]*/]
  })
}

export interface SearchRow {
  position: number;
  name: string;
  username: string;
  hasStorage: boolean;
  localDate: string;
}
