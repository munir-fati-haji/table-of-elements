import { Component, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { StringUtils } from '../../utils/string-utils';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatInputModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> {
  @Input({ required: true }) public set displayedColumns(columns: string[]) {
    this.columns = columns;
    this.headerMap = this.generateHeaderMap(columns);
  }
  @Input({ required: true }) public set rowData(data: T[]) {
    this.dataSource = new MatTableDataSource(data)
  };
  public headerMap!: { [key: string]: string };
  public columns!: string[];
  public dataSource!: MatTableDataSource<T>;

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private generateHeaderMap(columns: string[]): { [key: string]: string } {
    return columns.reduce(
      (acc, column) => ({
        ...acc,
        [column]: StringUtils.convertCamelCaseToTitleCase(column),
      }),
      {}
    );
  }
}
