import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { StringUtils } from '../../utils/string-utils';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TableAction } from '../../models/table-action';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> implements AfterViewInit {
  @Input({ required: true }) protected set displayedColumns(columns: string[]) {
    this.columns = columns;
    this.columnsToDisplay = ['actionColumn', ...this.columns];
    this.headerMap = this.generateHeaderMap(columns);
  }
  @Input({ required: true }) protected set rowData(data: T[]) {
    this.dataSource = new MatTableDataSource(data);
    this.updatePaginatorAndSorting();
  }
  @Input() protected actionList!: TableAction[];
  @Output() protected actionClick = new EventEmitter<{
    event: string;
    element: T;
  }>();
  protected headerMap!: Record<string, string>;
  protected columns!: string[];
  protected columnsToDisplay!: string[];
  protected dataSource!: MatTableDataSource<T>;
  @ViewChild(MatSort) protected sort!: MatSort;
  @ViewChild(MatPaginator) protected paginator!: MatPaginator;

  public ngAfterViewInit(): void {
    this.updatePaginatorAndSorting();
  }

  protected applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  protected onButtonClick(element: T, event: string): void {
    this.actionClick.emit({ element, event });
  }

  private updatePaginatorAndSorting(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
