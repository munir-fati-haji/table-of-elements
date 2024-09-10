import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { StringUtils } from '../../utils/string-utils';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TableAction } from '../../models/table-action';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> {
  @Input({ required: true }) public set displayedColumns(columns: string[]) {
    this.columns = columns;
    this.columnsToDisplay = ['actionColumn', ...this.columns];
    this.headerMap = this.generateHeaderMap(columns);
  }
  @Input({ required: true }) public set rowData(data: T[]) {
    this.dataSource = new MatTableDataSource(data);
  };
  @Input() public actionList!: TableAction[];
  @Output() public actionClick = new EventEmitter<{event: string, element: T}>();
  public headerMap!: Record<string, string>;
  public columns!: string[];
  public columnsToDisplay!: string[];
  public dataSource!: MatTableDataSource<T>;

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public onButtonClick(element: T, event: string): void {
    this.actionClick.emit({ element, event });
  }

  private generateHeaderMap(columns: string[]): Record<string, string> {
    return columns.reduce(
      (acc, column) => ({
        ...acc,
        [column]: StringUtils.convertCamelCaseToTitleCase(column),
      }),
      {},
    );
  }
}
