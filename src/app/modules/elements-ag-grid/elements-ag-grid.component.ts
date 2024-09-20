import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { TableComponent } from '../../shared/components/table/table.component';
import { AgGridAngular } from 'ag-grid-angular';
import { PeriodicElement } from '../elements/models/periodic-element';
import {
  CellEditingStoppedEvent,
  ColDef,
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';
import { ELEMENTS_MODAL_FIELDS } from '../elements/enums/fields';
import { StateManagementService } from '../state-management.service';
import { ActionMenuRendererComponent } from '../../shared/ag-grid/cell-renderers/action-menu-renderer.component';
import { ActionEvent } from '../elements/elements.component';

@Component({
  selector: 'app-elements-ag-grid',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    TableComponent,
    AgGridAngular,
  ],
  templateUrl: './elements-ag-grid.component.html',
  styleUrl: './elements-ag-grid.component.scss',
})
export class ElementsAgGridComponent {
  protected defaultColDef: ColDef = this.getDefaultColumnDefinition();
  protected gridApi: GridApi | undefined;
  protected columnDefs: ColDef[] = [];

  public constructor(public stateManagementService: StateManagementService) {
    if (!stateManagementService.rowData().length) {
      stateManagementService.initiateComponentData();
    }
    this.columnDefs = [this.actionColumn(), ...this.getColumnDefinitions()];
  }

  protected onGridReady({ api }: GridReadyEvent): void {
    this.gridApi = api;
    this.gridApi.onFilterChanged();
  }

  protected onGridSizeChanged(): void {
    this.gridApi?.sizeColumnsToFit();
  }

  protected onCellEditingStopped({
    data,
  }: CellEditingStoppedEvent<PeriodicElement>): void {
    const rowData = data as PeriodicElement;
    this.stateManagementService.updateRowDataAfterEdit(
      rowData.id as number,
      rowData,
    );
  }

  private getDefaultColumnDefinition(): ColDef {
    return {
      headerTooltip: '',
      autoHeight: true,
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
      floatingFilterComponentParams: { suppressFilterButton: true },
    };
  }

  private actionColumn(): ColDef {
    return {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: ActionMenuRendererComponent,
      filter: false,
      sortable: false,
      cellRendererParams: {
        actions: this.stateManagementService.actionList,
        onActionSelected: this.onActionClick.bind(this),
      },
    };
  }

  private onActionClick(action: ActionEvent): void {
    this.stateManagementService.onActionClick(action);
  }

  private getColumnDefinitions(): ColDef[] {
    return [
      ELEMENTS_MODAL_FIELDS.POSITION,
      ELEMENTS_MODAL_FIELDS.NAME,
      ELEMENTS_MODAL_FIELDS.WEIGHT,
      ELEMENTS_MODAL_FIELDS.SYMBOL,
    ].map((field) => ({ field, editable: true }));
  }
}
