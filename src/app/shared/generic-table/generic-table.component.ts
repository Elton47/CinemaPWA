import { Component, Input, ViewChild, OnChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatInput } from '@angular/material';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericTableComponent<T> implements OnChanges {
  @ViewChild(MatInput, { static: false }) filterInput: MatInput;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  dataSource: MatTableDataSource<T>;
  @Input()
  data: T[];
  @Input()
  displayedColumns: string[];
  @Input()
  filtering = true;
  @Input()
  pagination = true;
  @Input()
  sorting = true;
  @Input()
  pageSize = 10;
  @Input()
  pageSizeOptions = [10, 25, 50, 100];
  @Input()
  clickableRows = false;
  @Output()
  pageChange: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  rowClick: EventEmitter<T> = new EventEmitter<T>();

  constructor() {}

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => { // Ignoring cases for string sort.
      if (typeof this.getObjectValue(data, sortHeaderId) === 'string') {
        return this.getObjectValue(data, sortHeaderId).toLowerCase();
      }
      return this.getObjectValue(data, sortHeaderId);
    };
    this.dataSource.filterPredicate = (data, filter) => Object.values(data).join(' ').toLowerCase().includes(filter.toLowerCase());
    this.applyFilter();
  }

  public applyFilter = () => this.dataSource.filter = this.filterInput && this.filterInput.value;

  public getColumnName = (key: string): any => key.split('.').length ? key.split('.')[0] : key;

  public getObjectValue = (object: T, key: string): any => key.split('.').length ? key.split('.').reduce((prev: string, curr: string) => prev && prev[curr] || null, object) : object[key];
}