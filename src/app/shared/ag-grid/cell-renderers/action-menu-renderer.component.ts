import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { TableAction } from '../../models/table-action';
import { ICellRendererParams } from 'ag-grid-community';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

interface ActionEvent<T> {
  event: string;
  element: T;
}

interface CellRendererParams<T> extends ICellRendererParams {
  actions: TableAction[];
  onActionSelected: (value: ActionEvent<T>) => void;
}

@Component({
  selector: 'app-action-menu-renderer',
  template: `
    <button mat-button [matMenuTriggerFor]="menu">
      <mat-icon>arrow_drop_down</mat-icon>
    </button>
    <mat-menu #menu="matMenu">
      @for (action of actions; track action) {
        <button mat-menu-item (click)="onActionClick(action.text)">
          <mat-icon>{{ action.icon }}</mat-icon>
          {{ action.text }}
        </button>
      }
    </mat-menu>
  `,
  styles: [
    `
      button {
        display: flex;
        align-items: center;
      }
      mat-icon {
        margin-right: 8px;
      }
    `,
  ],
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
})
export class ActionMenuRendererComponent<T> implements ICellRendererAngularComp {
  public params!: CellRendererParams<T>;
  public actions: TableAction[] = [];

  public agInit(params: CellRendererParams<T>): void {
    this.params = params;
    this.actions = params.actions;
  }

  public refresh(): boolean {
    return true;
  }

  public onActionClick(action: string): void {
    this.params.onActionSelected({
      event: action,
      element: this.params.node.data as T,
    });
  }
}
