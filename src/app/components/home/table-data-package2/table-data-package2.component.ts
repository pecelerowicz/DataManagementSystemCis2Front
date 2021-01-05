import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {
  DataSetModel,
  DataSetService,
  DataSetModelApi,
} from '../../../services/data-set.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { merge, of as observableOf, Observable } from 'rxjs';
import { startWith, switchMap, map, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-table-data-package2',
  templateUrl: './table-data-package2.component.html',
  styleUrls: ['./table-data-package2.component.css'],
})
export class TableDataPackage2Component implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'description'];
  exampleDatabase: ExampleHttpDatabase | null;
  data: DataSetModel[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _httpClient: HttpClient,
    private dataSetService: DataSetService
  ) {}

  ngAfterViewInit(): void {
    this.exampleDatabase = new ExampleHttpDatabase(this.dataSetService);

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;
          console.log(data);
          return data.dataSetDtoList;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      )
      .subscribe((data) => {
        this.data = data;
      });
  }
}

export class ExampleHttpDatabase {
  constructor(private dataSetService: DataSetService) {}

  getRepoIssues(
    sort: string,
    order: string,
    page: number
  ): Observable<DataSetModelApi> {
    return this.dataSetService.getMyDataSetsPagination(page, 12);
  }
}
