import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetSearchListRequest, SearchResponse } from 'src/app/dto/my_search';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/services/search.service';
import { SearchComponent } from '../search.component';

@Component({
  selector: 'app-search-package',
  templateUrl: './search-package.component.html',
  styleUrls: ['./search-package.component.css']
})
export class SearchPackageComponent implements OnInit {
  users: string[];
  types: string[];
  search: FormGroup = getSearch();
  searchList: SearchResponse[];

  displayedColumns: string[] = ['position', 'name', 'username', 'metadata', 'storage'];
  dataSource: SearchRow[] = [];// = ELEMENT_DATA;

  constructor(private authService: AuthService, private searchService: SearchService) { }

  ngOnInit(): void {
    this.authService.getUsers().subscribe(
      val => {
        this.users = val;
      },
      err => {
        console.log(err);
      }
    )
    this.searchService.getTypes().subscribe(
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

    this.searchService.getSearchList(getSearchListRequest).subscribe(val => {
      this.searchList = val.searchResponseList;
      let fetch: SearchRow[] = [];

      let counter = 1;
      for(let s of val.searchResponseList) {
        fetch.push({position: counter, name: s.name, username: s.username, hasStorage: s.hasStorage});
        counter++;
      }

      this.dataSource = fetch;

    }, 
    err => {
      console.log(err);
    })
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
}
