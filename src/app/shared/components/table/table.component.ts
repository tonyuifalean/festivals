import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface ColumnElement {
  name: string;
  title: string;
  sortable: boolean;
}

export interface FestivalElement {
  description?: string;
  endDate?: string;
  festivalName?: string;
  id: string;
  startDate?: string;
}

export interface HotelElement {
  id: string;
  location: string;
  name: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges, AfterViewInit {
  @Input('dataSource')
  set dataSource(val: (FestivalElement | HotelElement)[]) {
    this.tableDataSource = new MatTableDataSource(val);
  }
  @Input('displayedColumns')
  set displayedColumns(val: ColumnElement[]) {
    this._displayedColumns = val;
    this.tableDisplayedColumns = val.map((column) => column.name);
  }
  get displayedColumns(): ColumnElement[] {
    return this._displayedColumns;
  }
  @Output() openTableItem = new EventEmitter<string>();
  @ViewChild(MatSort) sort!: MatSort;

  tableDataSource!: MatTableDataSource<FestivalElement | HotelElement>;
  tableDisplayedColumns: string[] = [];
  private _displayedColumns: ColumnElement[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'].currentValue !== this.dataSource) {
      this.tableDataSource.sort = this.sort;
    }
  }

  ngAfterViewInit() {
    if (this.tableDataSource) {
      this.tableDataSource.sort = this.sort;
    }
  }

  isSortable(columnName: string): boolean {
    return this.displayedColumns.find((column) => column.name === columnName)!
      .sortable;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  openItem(itemId: string) {
    this.openTableItem.emit(itemId);
  }
}
