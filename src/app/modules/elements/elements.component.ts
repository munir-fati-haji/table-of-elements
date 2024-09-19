import { Component } from '@angular/core';
import { TableAction } from '../../shared/models/table-action';
import { TableComponent } from '../../shared/components/table/table.component';
import { MatCardModule } from '@angular/material/card';
import { PeriodicElement } from './models/periodic-element';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StateManagementService } from '../state-management.service';

export interface ActionEvent {
  event: string;
  element: PeriodicElement;
}

@Component({
  selector: 'app-elements',
  standalone: true,
  imports: [TableComponent, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './elements.component.html',
  styleUrl: './elements.component.scss',
})
export class ElementsComponent {
  protected displayedColumns = ['position', 'name', 'weight', 'symbol'];
  protected actionList: TableAction[];

  public constructor(protected stateManagementService: StateManagementService) {
    this.actionList = stateManagementService.actionList;
    if (!stateManagementService.rowData().length) {
      stateManagementService.initiateComponentData();
    }
  }
}
